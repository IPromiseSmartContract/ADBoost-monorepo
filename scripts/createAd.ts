// scripts/createAd.ts

import { ethers } from "hardhat";

async function main() {
  // Assuming you have the contract deployed and have its address,
  // replace 'YOUR_CONTRACT_ADDRESS_HERE' with the actual contract address.
  const adBoostAddress = "0x2feEdc2a029F2d925A9b6dc6c54D669cCca5d849";

  // Retrieve the contract instance
  const AdBoost = await ethers.getContractAt("AdBoost", adBoostAddress);

  // Define the ad details
  const adName = "Your Ad Name";
  const boostTokenAddress = "0x87eC7b8e965230AAa24C137364eF97E66032c8B8"; // Use the correct token address here
  const rewardTokenAmount = ethers.parseEther("0.5");
  const preMintAdAmount = 10;
  const uri =
    "https://hardhat.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fshe-head.a8330420.svg&w=384&q=75";

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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
