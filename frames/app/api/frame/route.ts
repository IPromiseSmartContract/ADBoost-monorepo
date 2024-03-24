import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, parseEther } from 'viem';
import { base ,sepolia} from 'viem/chains';
import AdContractABI from '../../_contracts/AdContractABI';
import { AD_CONTRACT_ADDR } from '../../config'; 
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  // Encode the function call to the createAd function of your contract
  const data = encodeFunctionData({
    abi: AdContractABI,
    functionName: 'createAd',
    // @ts-ignore 
    args: [ "ad name", "0x56923048bf8A5f9C5d96Be2182D57F207895eCEd" , parseEther( "0.001"), parseInt( "0.002"), `https://test-frame-two.vercel.app/park-3.png`],
  });


  const txData: FrameTransactionResponse = {
    chainId: `eip155:${sepolia.id}`, // Adjust according to your network
    method: 'eth_sendTransaction',
    params: {
      abi: AdContractABI,
      data,
      to: AD_CONTRACT_ADDR,

      value: parseEther("0.001").toString(), 
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
