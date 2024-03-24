# Welcome to ADBoost 🚀
<a href="https://t.me/yuchengtsai" target="_blank"><img alt="Telegram" src="https://img.shields.io/badge/Telegram-2CA5E0.svg?&style=for-the-badge&logo=telegram&logoColor=white" /></a>
<a href="https://www.youtube.com/watch?v=og9BUd-H8Ig" target="_blank"><img alt="YT" src="https://img.shields.io/badge/youtube-d10808.svg?&style=for-the-badge&logo=youtube&logoColor=white" /></a>
<img width="1318" alt="image" src="https://github.com/IPromiseSmartContract/ADBoost-monorepo/assets/55632018/1be1d330-c089-4a25-be12-3ed2cf79ae2f">

### Introduction

In a world where traditional advertising is clouded with opacity, ADBoost emerges as a beacon of innovation, leveraging the Ethereum blockchain to usher in a new era of transparency, participation, and equitable rewards in advertising. Our mission is to dismantle the barriers erected by conventional advertising practices, ensuring that every stakeholder in the advertising value chain can verify the impact and reach of campaigns, actively participate in the dissemination of advertisements, and share in the success of advertising endeavors.

### Why ADBoost?

#### Pain Points in Traditional Advertising

- **Trust and Transparency**: The opaque nature of ad click and audience targeting calculations has always been a point of contention.
- **Public Participation**: The existing models exclude the general public from actively participating in and benefiting from the ad dissemination process.
- **Pricing Control**: The control over ad pricing, vested in intermediaries, introduces high levels of uncertainty.
- **Conversion Rate Calculations**: The indirect inference of true conversion rates from impressions to sales poses significant challenges.

#### The ADBoost Solution

ADBoost redefines the advertising landscape by introducing a decentralized platform that ensures:

- **Full Transparency in Campaigns**: Advertisers have clear visibility over their campaigns.
- **Engagement and Rewards for Boosters**: Viewers and spreaders are rewarded for their engagement, fostering a community-driven advertising ecosystem.

### Core Components

1. **Advertisement (AD)**: Leveraging ERC-1155 NFTs, advertisers can craft unique ad campaigns.
2. **Boost Token (BOOST)**: Our reward token, underpinned by Mint Club’s bonding curve protocol, ensures a transparent and equitable reward system.

<img width="725" alt="image" src="https://github.com/IPromiseSmartContract/ADBoost-monorepo/assets/55632018/b50503d0-e0bf-4a2c-8304-7d4e2f6030f9">

### Innovative Features

- **Reward Mechanism**: A novel approach to incentivizing the spread of ads.
- **Account Integrity**: Utilizing ZK-KYC for authentic account verification.
- **Conversion Rate Verification**: ORA’s CLE enables the measurement of genuine engagement.

### Our Advantages

- **Transparency and Trust**: A foundational pillar of ADBoost, ensuring all campaign aspects are verifiable.
- **Public Engagement and Reward**: Facilitating active participation from the general public.
- **Decentralized Pricing and Verifiable Conversion Rates**: Empowering advertisers with real-time, accurate campaign metrics.


Feel free to adapt this template to better fit your project’s needs or highlight specific features you wish to showcase.
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
<img width="1710" alt="image" src="https://github.com/IPromiseSmartContract/ADBoost-monorepo/assets/55632018/5e99ff8e-ef88-459e-bf73-243a5c9ebbb7">

**Setup:**
```bash
cd google-extension
yarn install
yarn build
```

### 3. Frontend Platform (`frontend` Folder)
A Next.js application serving as the front-end interface for ad campaign management, allowing advertisers to create, manage, and monitor their ad campaigns with ease.

<img width="1306" alt="image" src="https://github.com/IPromiseSmartContract/ADBoost-monorepo/assets/55632018/9dea2985-b79e-4dc8-ab0d-f3ca1bf05b4a">

### 3. Frames (`frames` Folder)
Directly mint/create AD on frame url  - will be eventually made fully customizable

ADBoost's Use of Farcaster Frames:

- Interactive Ads: Enhances viewer engagement with immersive advertising.
- Seamless Integration: Ads naturally blend into the Farcaster user experience.
- Blockchain Transparency: Every ad interaction is transparent and verifiable.
- Targeted Engagement: Directly connects with a blockchain-savvy audience.

- [Frames url](https://test-frame-two.vercel.app)

- [Warpcast Validator](https://warpcast.com/~/developers/frames?url=https%3A%2F%2Ftest-frame-two.vercel.app)

**NOTE: Currently Farcaster only supports Base,Op Mainnet and Zora, hence cant be tested on testnet, as our contract is currently on sepolia**

<img alt="" src="https://cdn.discordapp.com/attachments/1220970553448468560/1221323039979868201/image.png?ex=661228b7&is=65ffb3b7&hm=fbd1e3f97573a4c97ecea3d9dcb836abf6c64c24fe496597990b4b334e2385fe&" />
<img alt="" src="https://cdn.discordapp.com/attachments/1220970553448468560/1221323593904816238/image.png?ex=6612293b&is=65ffb43b&hm=5438b68b55400bdbf307ef965c3590b38a92cdd6a28f50c1f5dfc680d658f7a0&" />

**Setup:**
```bash
cd frontend
yarn install
yarn dev
```

## Getting Started

To get started with the ADBoost project, clone this repository and follow the setup instructions for each project. Ensure you have Yarn installed on your system.
