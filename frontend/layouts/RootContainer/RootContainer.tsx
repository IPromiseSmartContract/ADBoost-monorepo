"use client";

import * as React from "react";
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

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

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);
interface RootLayoutTypeProp {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

const RootLayout: React.FC<RootLayoutTypeProp> = ({ children }) => {
    return (
      <>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ConnectKitProvider>
              <NavgationBar />
              {children}
            </ConnectKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </>
    );
}
export default RootLayout;