import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract } from "ethers";
import { ERC20MOCK, Ad } from "../typechain-types";

describe("AdBoost", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const ERC20MOCK = await ethers.getContractFactory("ERC20MOCK");
    const boostToken = await ERC20MOCK.deploy("Boost Token", "BOOST");
    const rewardToken = await ERC20MOCK.connect(owner).deploy(
      "Reward Token",
      "REWARD"
    );
    const AdBoost = await ethers.getContractFactory("AdBoost");
    const adBoost = await AdBoost.deploy(
      boostToken.getAddress(),
      owner.address
    );
    return { adBoost, boostToken, rewardToken, owner, otherAccount };
  }
  it("Should deploy the contract", async function () {
    const { adBoost, boostToken, rewardToken, owner } = await deployFixture();
    // Check deployer is owner
    expect(await adBoost.owner()).to.equal(owner.address);
    expect(await adBoost.boostToken()).to.equal(boostToken);
  });

  it("Should create a new ad successfully", async function () {
    const { adBoost, boostToken, rewardToken, owner } = await deployFixture();
    // Create a new ad
    const adName = "Test Ad";
    const boostTokenAmount = ethers.parseEther("100");
    const rewardTokenAmount = ethers.parseEther("100");

    const preMintAdAmount = 10;
    const uri = "https://example.com/ad";

    const createTx = await adBoost
      .connect(owner)
      .createAd(
        adName,
        boostTokenAmount,
        rewardToken.getAddress(),
        rewardTokenAmount,
        preMintAdAmount,
        uri
      );
    await createTx.wait();
    const filter = adBoost.filters.AdCreated();
    const events = await adBoost.queryFilter(filter);
    const event = events[0];
    console.log(event.args?.creator);
    const ads = await adBoost.getAllAds();
    expect(ads.length).to.equal(1);
    const ad = await ethers.getContractAt("Ad", ads[0]);
    ad.balanceOf(owner, 1).then((balance) => {
      expect(balance).to.equal(preMintAdAmount);
    });
  });
});
