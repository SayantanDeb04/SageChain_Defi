require("@nomiclabs/hardhat-ethers"); // ✅ Compatible with ethers v5

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      // Default Hardhat Network config
    }
    // You can add more networks here, for example:
    // goerli: {
    //   url: "https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    //   accounts: ["0xYOUR_PRIVATE_KEY"]
    // }
  }
};
