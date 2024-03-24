# ADBoost Project Monorepo

Welcome to the ADBoost Project Monorepo, an Ethereum-based decentralized advertising solution designed to bring transparency, participation, and equitable reward distribution to the advertising process. This monorepo houses the core components of the ADBoost ecosystem, leveraging smart contracts, a browser extension for ad dissemination, and a front-end platform for ad campaign management.

## Quick Links

- Sepolia: [Contract Address](https://sepolia.etherscan.io/address/0x2feEdc2a029F2d925A9b6dc6c54D669cCca5d849)
- Linea: [Contract Address](https://goerli.lineascan.build/address/0x5017f7D9b6700df982c94fDbdc3ec3517Bd641DA)
- Optimism: [Contract Address](https://sepolia-optimism.etherscan.io/address/0x67302DE986354a4a89663dDaa18D908312f9eEF7)
- Polygon: [Contract Address](https://cardona-zkevm.polygonscan.com/address/0x3d2Bc1bCde9398a227B4178a09E9ba0e943F29e9)
- Zircuit: [Contract Address](https://explorer.zircuit.com/address/0x5017f7D9b6700df982c94fDbdc3ec3517Bd641DA)

## Projects Overview

This monorepo is structured into three main projects:

### 1. Hardhat Project (Root Directory)
The backbone of ADBoost, containing smart contracts for ad campaigns, reward mechanisms, and integrations with Mint Club and ZK Oracle for enhanced functionality.

**Setup:**
```bash
yarn install
yarn compile
```

### 2. Google Extension (`google-extension` Folder)
A browser extension that enables users and advertisers to engage with the ADBoost platform directly from their browser, facilitating the distribution and viewing of ads.

**Setup:**
```bash
cd google-extension
yarn install
yarn build
```

### 3. Frontend Platform (`frontend` Folder)
A Next.js application serving as the front-end interface for ad campaign management, allowing advertisers to create, manage, and monitor their ad campaigns with ease.

**Setup:**
```bash
cd frontend
yarn install
yarn dev
```

## Getting Started

To get started with the ADBoost project, clone this repository and follow the setup instructions for each project. Ensure you have Yarn installed on your system.
