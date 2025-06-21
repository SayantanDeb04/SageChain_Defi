const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying SageToken with:", deployer.address);

  const SageToken = await hre.ethers.getContractFactory("SageToken");
  const initialSupply = 1_000_000; // 1 million tokens
  const token = await SageToken.deploy(initialSupply);
  await token.deployed();

  console.log("✅ SageToken deployed at:", token.address);
}

main().catch((error) => {
  console.error("❌ Error deploying SageToken:", error);
  process.exitCode = 1;
});
