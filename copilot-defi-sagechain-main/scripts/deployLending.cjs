// deployLending.cjs
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(">> Deploying contracts with:", deployer.address);

  // Deploy a test ERC20 token (SimpleERC20 must exist in your contracts)
  const ERC20 = await hre.ethers.getContractFactory("SimpleERC20");
  const erc20 = await ERC20.deploy("TestToken", "TT", 18);
  await erc20.deployed();
  console.log("✅ Test ERC20 deployed to:", erc20.address);

  // Use the deployed ERC20 token address
  const tokenAddress = erc20.address;

  const LendingProtocol = await hre.ethers.getContractFactory("LendingProtocol");
  const lending = await LendingProtocol.deploy(tokenAddress);

  await lending.deployed();
  console.log("✅ LendingProtocol deployed to:", lending.address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
