// scripts/boostAd.ts

import { ethers } from "hardhat";

async function main() {
  const adAddress = "0xF8a8f3ca91c018Bf956CD83860d64EC0Cb6F32Ec"; // Replace with your Ad contract address
  const senderAddress = (await ethers.provider.getSigner()).address; // Address that boosts the ad
  const recipientAddress = "0x35Da734a996Ecb9E04C791aebb2b21A6E4D3FF00"; // Address to which the ad is boosted
  const adId = 1; // The ID of the ad to boost
  const quantity = 1; // Number of ads to boost

  const Ad = await ethers.getContractAt("Ad", adAddress);
  console.log(
    `Boosting ${quantity} ad from ${senderAddress} to ${recipientAddress}...`
  );

  const boostTx = await Ad.connect(
    await ethers.getSigner(senderAddress)
  ).safeTransferFrom(senderAddress, recipientAddress, adId, quantity, "0x");
  await boostTx.wait();

  console.log(
    `Successfully boosted ${quantity} ad from ${senderAddress} to ${recipientAddress}.`
  );
  // Display the image URI of the ad
  const uri = await Ad.uri(adId);
  console.log(`Ad URI: ${uri}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
