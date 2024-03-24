import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
// import { mintclub } from 'mint.club-v2-sdk';
import { parseEther } from 'viem';

async function deployToken(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 400 });
  }
  const { mintclub } = await import('mint.club-v2-sdk');
  // Parse the concatenated data from message.input
  const params = new URLSearchParams(decodeURIComponent(message.input));
  const adName = params.get('adName');
  const imageUri = params.get('imageUri');
  const ethAmount = params.get('ethAmount');
  const preMintAdAmount = params.get('preMintAdAmount');

  if (!adName || !ethAmount || !preMintAdAmount) {
    return new NextResponse('Required data is missing', { status: 400 });
  }

  // Use Mint Club SDK to deploy the token
  const Token = mintclub.network('sepolia').token(adName);

  // Deploy the token
  const result = await Token.create({
    name: adName,
    reserveToken: {
      address: '0x4200000000000000000000000000000000000006',
      decimals: 18,
    },
    curveData: {
      curveType: 'EXPONENTIAL',
      stepCount: 10,
      maxSupply: 10_000,
      initialMintingPrice: 0.2,
      finalMintingPrice: 0.3,
      creatorAllocation: 100,
    },
  });

  // Check the result and proceed
  if (result) {
    const tokenAddress = await mintclub.network('sepolia').token(adName).getTokenAddress();
    const etherscanLink = `https://sepolia.etherscan.io/token/${tokenAddress}`;
    // Token deployed successfully, encode all data including the token address for the next step
    const encodedData = encodeURIComponent(`adName=${adName}&imageUri=${imageUri}&ethAmount=${ethAmount}&preMintAdAmount=${preMintAdAmount}&tokenAddress=${tokenAddress}`);

    return new NextResponse(getFrameHtmlResponse({
        buttons: [
            {
              label: 'View Token on Etherscan',
              action: 'link',
              target: etherscanLink,
            },
            {
              label: 'Proceed to Create Ad',
              action: 'tx',
              target: `${NEXT_PUBLIC_URL}/api/ad-creation`, // Next step to initiate ad creation
              postUrl: `${NEXT_PUBLIC_URL}/api/tx-success`, //postsuccess
            },
          ],
      image: {
        src: `${NEXT_PUBLIC_URL}/park-2.png`,
        aspectRatio: '1:1',
      },
      input: {
        text: encodedData, // Pass all the data as input text for the next step
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }));
  } else {
    // Handle deployment failure
    return new NextResponse('Token deployment failed', { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return deployToken(req);
}

export const dynamic = 'force-dynamic';
