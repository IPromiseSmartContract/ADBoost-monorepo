import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();
let SEP_URL = process.env.SEP_URL;
let LINEA_URL = process.env.LINEA_URL;
let OP_URL = process.env.OP_URL;
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
    linea: {
      url: LINEA_URL,
      accounts: [SEPOLIA_PRIVATE_KEY!],
    },
    optimism: {
      url: OP_URL!,
      accounts: [SEPOLIA_PRIVATE_KEY!],
    },
    polygon: {
      url: "https://rpc.cardona.zkevm-rpc.com",
      accounts: [SEPOLIA_PRIVATE_KEY!],
    },
    zircuit: {
      url: "https://zircuit1.p2pify.com",
      accounts: [SEPOLIA_PRIVATE_KEY!],
    },
    "thunder-testnet": {
      url: "https://testnet-rpc.thundercore.com",
      chainId: 18,
      gas: 90000000,
      gasPrice: 15e9,
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
