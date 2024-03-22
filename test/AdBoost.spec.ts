import { ethers } from "hardhat";
import { expect } from "chai";
import { toBigInt } from "ethers";

describe("AdBoost", function () {
  async function deployFixture() {
    const [owner, ...otherAccounts] = await ethers.getSigners();
    const boostToken = await ethers.getContractAt(
      "MCV2_Token",
      "0x87eC7b8e965230AAa24C137364eF97E66032c8B8"
    );
    // const testAddress = "0xC13c8066b82c6785773A1e04e0442Dd4Ca8d552B";
    // const testWallet = ethers.getImpersonatedSigner(testAddress);
    const AdBoost = await ethers.getContractFactory("AdBoost");
    const adBoost = await AdBoost.deploy(owner);
    return { adBoost, boostToken, owner, otherAccounts };
  }

  it("Should deploy the contract", async function () {
    const { adBoost, boostToken, owner } = await deployFixture();
    // Check deployer is owner
    expect(await adBoost.owner()).to.equal(owner.address);
  });

  it("Should create a new ad successfully", async function () {
    const { adBoost, boostToken, owner } = await deployFixture();
    // Create a new ad
    const adName = "Test Ad";
    const rewardTokenAmount = ethers.parseEther("0.5");
    const preMintAdAmount = 8;
    const uri = "https://example.com/ad";
    const createTx = await adBoost
      .connect(owner)
      .createAd(
        adName,
        boostToken.getAddress(),
        rewardTokenAmount,
        preMintAdAmount,
        uri,
        { value: rewardTokenAmount }
      );
    await createTx.wait();
    // get last ad
    const ads = await adBoost.getAllAds();
    const newAd = await ethers.getContractAt("Ad", ads[ads.length - 1]);
    const filter = newAd.filters.AdCreated();
    const events = await newAd.queryFilter(filter);
    const event = events[0];

    newAd.balanceOf(owner, 1).then((balance) => {
      expect(balance).to.equal(preMintAdAmount);
    });
  });

  it("Should boost an ad successfully", async function () {
    const { adBoost, boostToken, owner, otherAccounts } = await deployFixture();

    // Create a new ad
    const adName = "ETHTaipei";
    const rewardTokenAmount = ethers.parseEther("0.5");
    const preMintAdAmount = 12;
    const uri = "https://example.com/ad";
    const createTx = await adBoost
      .connect(owner)
      .createAd(
        adName,
        boostToken.getAddress(),
        rewardTokenAmount,
        preMintAdAmount,
        uri,
        { value: rewardTokenAmount }
      );
    await createTx.wait();
    const ads = await adBoost.getAllAds();
    const ad = await ethers.getContractAt("Ad", ads[0]);

    // Boosters
    const [booster_1, booster_2, booster_3] = otherAccounts;

    // Mint the ad to other account
    const mintAdTx = await ad
      .connect(booster_1)
      .mint(booster_1.address, 1, 10, "0x");
    await mintAdTx.wait();

    let booster1Balance = await ad.balanceOf(booster_1.address, 1);
    let booster2Balance = await ad.balanceOf(booster_2.address, 1);
    let booster3Balance = await ad.balanceOf(booster_3.address, 1);

    // 1. Boost the ad (1->2)
    const boostTx = await ad
      .connect(booster_1)
      .safeTransferFrom(booster_1, booster_2, 1, 1, "0x");
    await boostTx.wait();

    let postBoost1Balance = await ad.balanceOf(booster_1.address, 1);
    let postBoost2Balance = await ad.balanceOf(booster_2.address, 1);
    expect(postBoost1Balance).to.equal(booster1Balance - toBigInt(1));
    expect(postBoost2Balance).to.equal(booster2Balance + toBigInt(1));

    // Update the balance
    booster1Balance = postBoost1Balance;
    booster2Balance = postBoost2Balance;

    // 2. Boost the ad (2->3)
    // Boost the ad again
    const boostTx2 = await ad
      .connect(booster_2)
      .safeTransferFrom(booster_2, booster_3, 1, 1, "0x");
    await boostTx2.wait();
    postBoost2Balance = await ad.balanceOf(booster_2.address, 1);
    let postBoost3Balance = await ad.balanceOf(booster_3.address, 1);

    // Check the balance
    expect(postBoost2Balance).to.equal(booster2Balance - toBigInt(1));
    expect(postBoost3Balance).to.equal(booster3Balance + toBigInt(1));

    // 3. Booster 1 should recieve the BOOST token
    expect(await boostToken.balanceOf(booster_1.address)).to.equal(
      toBigInt(1) * toBigInt(10) ** (await boostToken.decimals())
    );
  });
});
