require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
const { PRIVATE_KEY, API_KEY, PRIVATE_KEY2 } = process.env;
module.exports = {
  defaultNetwork: "sepolia",
  paths: {
    artifacts: "./identity-management-react/src/pages/artifacts",
    cache: "./identity-management-react/src/pages/cache",
  },
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`,
      accounts: [PRIVATE_KEY, PRIVATE_KEY2],
    },
  },
};
