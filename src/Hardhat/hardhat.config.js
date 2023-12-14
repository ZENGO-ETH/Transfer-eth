require("dotenv").config({ path: ".env" });
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-web3')
require('@nomicfoundation/hardhat-chai-matchers')
require('hardhat-faucet')
const JsonRpcProxy = require('web3-providers-http-proxy');
const URL = 'https://test.confluxrpc.com';
const proxy = new JsonRpcProxy(URL);
//require("hardhat-live-fork");
//console.log(proxy)

/** @type import('hardhat/config').HardhatUserConfig */

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

module.exports = {
  solidity: '0.8.17',
  defaultNetwork: 'flashbots',
  networks: {
    'lotus-local-net': {
      url: 'http://localhost:8545',
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
    'wallaby': {
      url: 'https://wallaby.node.glif.io/rpc/v0',
      httpHeaders: {
        'Content-Type': 'application/json',
      },
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
    'flashbots': {
      url: 'https://rpc.flashbots.net?bundle=36204547-f232-460c-81b7-75e2562dbd8b',
      httpHeaders: {
        'Content-Type': 'application/json',
      },
     accounts: [process.env.DEPLOYER_PRIVATE_KEY],
   },
    hardhat: {
     /*
      mining: {
        auto: true,
        interval: 1000,
      },
*/
      chainId: 1,
      enabled: true,
      accounts: [
        {
          privateKey: process.env.DEPLOYER_PRIVATE_KEY,
          balance: "100000000000000000000",
        }],
    },
  },
   etherscan: {
    apiKey: {
      mainnet: "CCJN4ZFFES6UJGZ9EAECF6DAYNIWPS8ZTF",
    },
  },
}
