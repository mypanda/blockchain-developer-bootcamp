课程：b站删除了
https://www.youtube.com/watch?v=XdKv5uwEk5A&t=4734s
官网：
https://www.dappuniversity.com/

How To Build A Blockchain App  https://www.youtube.com/watch?v=VH9Q2lf2mNo
Build Your First Blockchain Application https://www.youtube.com/watch?v=rzvk2kdjr2I 
The Ultimate Ethereum Dapp Tutorial https://www.youtube.com/watch?v=3681ZYbDSSk
Code Your Own Cryptocurrency on Ethereum  https://www.youtube.com/watch?v=XdKv5uwEk5A

四个视频下载到了百度盘
https://pan.baidu.com/disk/main#/index?category=all&path=%2F1TMP%2Fyoutube
----------------------------------------------------------------------

步骤
创建React应用 `create-react-app`
初始化Truffle配置文件 `truffle init` 或者 `truffle unbox metacoin`

文件
truffle-config.js
```
require('babel-register')
require('babel-polyfill')
require('dotenv').config()

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
       optimizer: {
         enabled: true,
         runs: 200
       }
    }
  }
}
```

test\Token.test.js
```
const Token = artifacts.require("./Token");
  
contract("Token", (accounts) => {
  
  it('tracks the name', async done => {
    const token = await Token.deployed()
    const result = await token.name()
    assert.equal(result,"My Name")
  })

})
```

2_deploy_contracts.js
```
const Token = artifacts.require("Token");
module.exports = function (deployer) {
  deployer.deploy(Token);
};
```

src\contracts\Token.sol
```
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Token {
  string public name = "My Name";
}
```

备注
npm i -S bootstrap chai chai-as-promised chai-bignumber redux react-redux redux-logger dotenv lodash moment reselect apexcharts openzeppelin-solidity solidity-coverage truffle truffle-flattener truffle-hdwallet-provider-privkey @truffle/hdwallet-provider web3 
https://gist.github.com/gwmccubbin/daf4795428bef6aa98075b5d98d1b28e
install http://truffleframework.com/ganache
npm i -g truffle

truffle init
truffle unbox metacoin

truffle compile 编译智能合约
truffle migrate 部署智能合约，truffle选择第一个用户部署合约
truffle console
  const token = await Token.deployed()
  token.address
  const name = await token.name()
truffle test


参考
https://github.com/ethereum/eips/issues/20
https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md


### TypeError: Member "add" nendent lookup in uint256
数据格式需要严格
```sol
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Token {
  using SafeMath for uint;
}
```