import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();
let SEP_URL = process.env.SEP_URL;
let ETHER_SCAN_API_KEY = process.env.ETHER_SCAN_API_KEY;
let SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-sepolia.g.alchemy.com/v2/zF6xioFDOk1zHKWUGk-bmtRZmxxz4Vjb",
        blockNumber: 5535029,
      },
    },
    sepolia: {
      url: SEP_URL,
      accounts: [SEPOLIA_PRIVATE_KEY!],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHER_SCAN_API_KEY,
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true,
  },
};

export default config;
