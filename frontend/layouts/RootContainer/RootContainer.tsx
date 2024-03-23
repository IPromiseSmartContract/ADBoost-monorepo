"use client";

import * as React from "react";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import NavgationBar from "@/layouts/NavgationBar";

import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})


interface RootLayoutTypeProp {
    children: React.ReactNode;
}

// const config = getDefaultConfig({
//   appName: 'My RainbowKit App',
//   projectId: 'YOUR_PROJECT_ID',
//   chains: [mainnet, polygon, optimism, arbitrum, base],
//   ssr: true, 
// });

const queryClient = new QueryClient();

const RootLayout: React.FC<RootLayoutTypeProp> = ({ children }) => {
    return (
      <>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
            <NavgationBar />
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </>
    );
}
export default RootLayout;