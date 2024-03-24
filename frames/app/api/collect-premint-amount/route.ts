import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function collectPreMintAmount(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
  const state = JSON.parse(message?.state.serialized || "");
  if (!isValid) {
    return new NextResponse('Message not valid', { status: 400 });
  }
  console.log(state)
  // Assuming adName, imageUri, and ethAmount were passed to this step in the input
  const previousData = encodeURIComponent(message.input); // This contains 'adName', 'imageUri', and 'ethAmount'

  // Append '&preMintAdAmount=' to the existing data for the user to fill in
  const newData = `${previousData}&preMintAdAmount=`; // Placeholder for user input

  return new NextResponse(getFrameHtmlResponse({
    buttons: [
      {
        action: 'post',
        label: 'Submit Pre-Mint Amount',
        target: `${NEXT_PUBLIC_URL}/api/deploy-token`, // Next step for token deployment
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/park-1.png`, // Placeholder image for this step
      aspectRatio: '1:1',
    },
    input: {
      text: state.ethAmt, // Pass the concatenated data for the next step
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
  }));
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return collectPreMintAmount(req);
}

export const dynamic = 'force-dynamic';
