import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function collectEthAmount(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
  // const state = JSON.parse(message?.state.serialized || "");
  console.log(message?.state.serialized)
  if (!isValid) {
    return new NextResponse('Message not valid', { status: 400 });
  }

  
  const ethAmt = message.input; 



  return new NextResponse(getFrameHtmlResponse({
    buttons: [
      {
        action: 'post',
        label: 'Submit ETH Amount',
        target: `${NEXT_PUBLIC_URL}/api/collect-premint-amount`, // Next step to collect pre-mint ad amount
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/park-1.png`, // Placeholder image for this step
      aspectRatio: '1:1',
    },
    input: {
      text: "pre mint amount", // Pass the concatenated data for the next step
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    state:{
      // adName: state?.adName,
      ethAmount: ethAmt
    }
  }));
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return collectEthAmount(req);
}

export const dynamic = 'force-dynamic';
