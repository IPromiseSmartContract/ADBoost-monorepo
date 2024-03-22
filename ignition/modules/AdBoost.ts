import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AdBoostModule = buildModule("AdBoostModule", (m) => {
  //   account
  const owner = m.getAccount(0);
  const adboost = m.contract("AdBoost", [owner], {});
  return { adboost };
});

export default AdBoostModule;
