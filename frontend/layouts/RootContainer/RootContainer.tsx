"use client";

import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '../../libs/config'

interface RootContainerTypeProp {
    children: ReactNode;
}

const queryClient = new QueryClient()

const RootContainer: React.FC<RootContainerTypeProp> = ({children}) => {
    return (
        <>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}> 
                    {children}
                </QueryClientProvider> 
             </WagmiProvider>
        </>
    );
}

export default RootContainer;