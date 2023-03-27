const fetchNFTs = require('../api/fetchNFTs');

// 多NFT
// const walletAddress = "0xc4fc936a55AbfBA99D9c3D7B6551fD5178D3E6d9";
// 单teacherNFT
const walletAddress = "0xE2396a0B1b596E356cD8D36fb360E896893475D2";

// 空NFT
// const walletAddress = "0x37EA03401179beD7774FB4009A249Cf29Ef17bF7";
fetchNFTs(walletAddress);