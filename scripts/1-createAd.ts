// scripts/createAd.ts

import { ethers } from "hardhat";

async function main() {
  // Assuming you have the contract deployed and have its address,
  // replace 'YOUR_CONTRACT_ADDRESS_HERE' with the actual contract address.
  const adBoostAddress = "0x2feEdc2a029F2d925A9b6dc6c54D669cCca5d849";

  // Retrieve the contract instance
  const AdBoost = await ethers.getContractAt("AdBoost", adBoostAddress);

  // Define the ad details
  const adName = "ETHOnline Ad";
  const boostTokenAddress = "0x284F972A991a93Fd36E06fd558C3C5A4f3705DE8"; // Use the correct token address here
  const rewardTokenAmount = ethers.parseEther("0.01");
  const preMintAdAmount = 12;
  const uri =
    "https://media.tenor.com/CW2KRhVyPJoAAAAi/asd88bet-daftar-gif.gif";

  console.log("Creating a new ad...");

  // Execute the createAd function
  const createAdTx = await AdBoost.createAd(
    adName,
    boostTokenAddress,
    rewardTokenAmount,
    preMintAdAmount,
    uri,
    { value: rewardTokenAmount }
  );

  // Wait for the transaction to be mined
  await createAdTx.wait();

  console.log("Ad created successfully!");
  // Get the address of the newly created ad
  const ads = await AdBoost.getAllAds();
  const newAdAddress = ads[ads.length - 1];
  console.log(`New ad address: ${newAdAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
