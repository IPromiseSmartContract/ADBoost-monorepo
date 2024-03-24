import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

// const frameMetadata = getFrameMetadata({
//   buttons: [
    
//     {
//       action: 'tx',
//       label: 'Send Base Sepolia',
//       target: `${NEXT_PUBLIC_URL}/api/tx`,
//       postUrl: `${NEXT_PUBLIC_URL}/api/tx-success`,
//     },
//   ],
//   image: {
//     src: `${NEXT_PUBLIC_URL}/park-3.png`,
//     aspectRatio: '1:1',
//   },
//   input: {
//     text: 'Tell me a story',
//   },
//   postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
// });
const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'post',
      label: 'Enter Ad Name',
      target: `${NEXT_PUBLIC_URL}/api/collect-image-uri`,
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/park-3.png`, // Placeholder image
    aspectRatio: '1:1',
  },
  input: {
    text: 'Enter Ad Name',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,

});


// export const metadata: Metadata = {
//   title: 'zizzamia.xyz',
//   description: 'LFG',
//   openGraph: {
//     title: 'zizzamia.xyz',
//     description: 'LFG',
//     images: [`${NEXT_PUBLIC_URL}/park-1.png`],
//   },
//   other: {
//     ...frameMetadata,
//   },
// };

export const metadata: Metadata = {
  title: 'Ad Creation',
  description: 'Enter Ad Name',
  openGraph: {
    title: 'Ad Creation',
    description: 'Enter Ad Name',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};


export default function Page() {
  return (
    <>
      <h1>AD creation</h1>
    </>
  );
}
