import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotEnvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/types";

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  defaultNetwork: 'hardhat',
  networks: {
    'lotus-local-net': {
      url: 'http://localhost:8545',
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      httpHeaders: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With"
      },
     live: true,
     saveDeployments: true,
     tags: ["staging"],
     gasPrice: 5000000000,
     gasMultiplier: 2,
    },
    'goerli': {
      url: 'https://eth-goerli.g.alchemy.com/v2/wclNpXmfZtKJEXQ85Ze5NpiHtPykJAQl',
      httpHeaders: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With"
      },
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 5000000000,
      gasMultiplier: 2,
    },
    'flashbots': {
      url: 'https://rpc.flashbots.net?bundle=b8ed259e-84f0-4b62-ad6c-73effc6eac36',
      httpHeaders: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With"
      },
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 5000000000,
      gasMultiplier: 2,
     accounts: [process.env.DEPLOYER_PRIVATE_KEY],
   },
    hardhat: {
  /*
      mining: {
        auto: true,
        interval: 1000,
        mempool: {
        order: "fifo"
        }
      },
*/
      chainId: 1,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gas: "auto",
      gasPrice: 5000000000,
      gasMultiplier: 2,
      txMiningBlockHeightOffset: [1, 5],
      httpHeaders: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With"
      },
      enabled: true,
      latency: [15, 60],
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
   mocha: {
    timeout: 300000,
    bail: true,
  },
};

export default config;
