require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/HhfUvZcf0a63Gtt9Nt9hFc7fkJMNlLTm',
      accounts: ['ced0a43fe4293eee18be03ecbb68f9714d2060606d8f590d6b2e8fbb29fc435a'],
    },
  },
};