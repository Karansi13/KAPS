import { ethers } from "hardhat";

const main = async () => {
  const KAPS = await ethers.getContractFactory("KAPS");
  const KAPS = await KAPS.deploy();

  await KAPS.deployed();

  console.log(`Contract address is to ${KAPS.address}`);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runMain();
