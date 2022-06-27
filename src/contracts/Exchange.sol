// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./Token.sol";

// Deposit & Withdraw Funds
// Manage Orders -Make or Cancel
// Handle Trades - Change fees

// TODO
// [] Set the fee account
// [] Withdraw Ether
// [] Deposit Tokens
// [] Withdraw Tokens
// [] Check balances
// [] Make order
// [] Cancel order
// [] Fill order
// [] Change order

contract Exchange {
  using SafeMath for uint;

  address public feeAccount; // the account that receives exchange
  uint256 public feePercent; // the fee percentage
  address constant ETHER =address(0); // store Ether in tokens mapping with blank dddress
  mapping(address => mapping(address => uint256)) public tokens;

  // Events
  event Deposit(address token, address user, uint256 amount, uint256 balance);

  constructor(address _feeAccount, uint256 _percentage) public{
    feeAccount = _feeAccount;
    feePercent = _percentage;
  }

  // payable可以支付
  function depositEther()payable public{
    tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].add(msg.value);
    emit Deposit((ETHER), msg.sender, msg.value, tokens[ETHER][msg.sender]);
  }

  function depositToken(address _token,uint256 _amount) public{
    // TODO: Dno`t allow Ether deposits
    require(_token != ETHER);
    // Which token?
    require(Token(_token).transferFrom(msg.sender, address(this), _amount));
    // How much?
    // Send tokens to this contract
    tokens[_token][msg.sender] =tokens[_token][msg.sender].add(_amount);
    // Manage deposit - update balance
    // Emit event
    emit Deposit(_token,msg.sender,_amount,tokens[_token][msg.sender]);
  }
}
