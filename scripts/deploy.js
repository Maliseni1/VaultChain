const hre = require("hardhat");

async function main() {
  // 1. Get the Contract Factory
  const VaultChain = await hre.ethers.getContractFactory("VaultChain");

  // 2. Deploy the Contract
  const vaultChain = await VaultChain.deploy();

  // 3. Wait for it to be mined
  await vaultChain.waitForDeployment();

  console.log(`VaultChain deployed to: ${await vaultChain.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});