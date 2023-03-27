import { ethers } from "ethers";

// 定义 ERC-721 合约地址和 ABI
const contractAddress = '0xf4910c763ed4e47a585e2d34baa9a4b611ae448c';
const contractABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

// 创建 ethers.js provider 和 contract 实例
const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID');
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// 查询指定地址是否持有指定 tokenId 的 NFT
async function checkNFTOwner(address, tokenId) {
  try {
    const owner = await contract.ownerOf(tokenId);
    return owner === address;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 使用示例
const walletAddress = '0x1234567890123456789012345678901234567890';
const tokenId = 123;
const isNFTOwner = await checkNFTOwner(walletAddress, tokenId);
console.log(`Wallet address ${walletAddress} owns NFT ${tokenId}: ${isNFTOwner}`);