export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'
// require(balanceOf[msg.sender] >= _value); 导致的报错
export const EVM_REVERT = 'VM Exception while processing transaction: revert'
export const ether = n => {
  return new web3.utils.BN(
    web3.utils.toWei(n.toString(), 'ether')
  )
}
// some as ether
export const tokens = n => ether(n)