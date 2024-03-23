// scripts/mintAd.ts

import { ethers } from "hardhat";

async function main() {
  const adAddress = "0xF8a8f3ca91c018Bf956CD83860d64EC0Cb6F32Ec"; // Replace with your Ad contract address
  const recipientAddress = "0xf6fbbFC3C1eCe8Ef1D6Ee5F5F28702037875d470"; // Address to receive the minted ads
  const adId = 1; // The ID of the ad to mint
  const quantity = 10; // Number of ads to mint

  const Ad = await ethers.getContractAt("Ad", adAddress);
  console.log(`Minting ${quantity} ads to ${recipientAddress}...`);

  const mintTx = await Ad.mint(recipientAddress, adId, quantity, "0x");
  await mintTx.wait();

  console.log(`Successfully minted ${quantity} ads to ${recipientAddress}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
