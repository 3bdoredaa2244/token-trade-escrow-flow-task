require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      chainId: 1337,
    },
    // Add testnet or mainnet if needed
    // goerli: {
    //   url: "https://eth-goerli.alchemyapi.io/v2/YOUR_API_KEY",
    //   accounts: ["0xYOUR_PRIVATE_KEY"],
    // },
  },
};
