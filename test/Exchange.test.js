import { tokens,ether, EVM_REVERT,ETHER_ADDRESS } from './helpers'

require('chai').use(require('chai-as-promised')).should()

const Token = artifacts.require("./Token")
const Exchange = artifacts.require("./Exchange")

contract('Exchange', ([deployer,feeAccount,user1]) => {
  let token
  let exchange
  const feePercent = 10

  beforeEach(async ()=>{
    // Deploy token
    token = await Token.new()

    // transfer some token to user1
    token.transfer(user1, tokens(100), {from:deployer})

    // Deploy exchange
    exchange = await Exchange.new(feeAccount,feePercent)
  })

  describe('delopment', _ => {

    it('tracks the fee account', async () => {
      const result = await exchange.feeAccount()
      result.should.equal(feeAccount)
    });

    it('tracks the fee percent', async () => {
      const result = await exchange.feePercent()
      result.toString().should.equal(feePercent.toString())
    });
    

  })

  describe('fallback',()=>{
    it('reverts when ether is send', async ()=>{
      await exchange.sendTransaction({value:1,from:user1}).should.be.rejectedWith(EVM_REVERT)
    })
  })

  describe('depositing Ether', async ()=>{
    let result
    let amount

    beforeEach(async () => {
      amount = ether(1)
      result = await exchange.depositEther({from: user1,value: amount})
    })

    it('tracks the ether deposit', async () => {
      const balance = await exchange.tokens(ETHER_ADDRESS,user1)
      balance.toString().should.equal(amount.toString())
    })

    it('emits a Deposit event', async () => {
      const log = result.logs[0]
      log.event.should.equal('Deposit')
      const event = log.args
      event.token.should.equal(ETHER_ADDRESS, 'token address is correct')
      event.user.should.equal(user1, 'user address is correct')
      event.amount.toString().should.equal(amount.toString(), 'amount is correct')
      event.balance.toString().should.equal( amount.toString(),'balance is correct')
    })

  })

  describe('depositing tokens', _ => {

    let result
    let amount
    // beforeEach(async () => {
    //   amount = tokens(10)
    //   await token.approve(exchange.address, amount, {from:user1})
    //   result = await exchange.depositToken(token.address,amount, { from: user1})
    // })
    describe('success',  () => {

      // it('fails when no tokens are approved')开发， 从上面复制下来
      beforeEach(async () => {
        amount = tokens(10)
        await token.approve(exchange.address, amount, {from:user1})
        result = await exchange.depositToken(token.address,amount, { from: user1})
      })

      it('tracks the token depoit',async ()=>{
        // check exchange token balance
        let balance
        balance = await token.balanceOf(exchange.address)
        balance.toString().should.equal(amount.toString())
        
        // check tokens on exchange
        balance = await exchange.tokens(token.address,user1)
        balance.toString().should.equal(amount.toString())
      })

      it('emits a Deposit event', async () => {
        const log = result.logs[0]
        log.event.should.equal('Deposit')
        const event = log.args
        event.token.should.equal(token.address, 'token address is correct')
        event.user.should.equal(user1, 'user address is correct')
        event.amount.toString().should.equal(amount.toString(), 'amount is correct')
        event.balance.toString().should.equal( amount.toString(),'balance is correct')
      })
    });

    describe('failure',  () => {
      it('rejects Ether deposits', async () => {
        // TODO: fill me in...
        await exchange.depositToken(ETHER_ADDRESS, tokens(10),{from:user1}).should.be.rejectedWith(EVM_REVERT)
      })
      it('fails when no tokens are approved', async () => {
        // 没有存款不批准任何代币
        // Don`t approve ant tokens before depositing
        await exchange.depositToken(token.address, tokens(10), {from:user1}).should.be.rejectedWith(EVM_REVERT)
      })
    });
    

  })
});
