const axios = require('axios').default;

async function fetchNFTs(walletAddress) {
  const instance = axios.create({
    baseURL: "https://rinkeby-api.opensea.io/api/v1",
    timeout: 10000,
  });
  const response = await instance.get(`/assets?owner=${walletAddress}&order_direction=desc&offset=0&limit=50`);
   const nftMetadata = response.data.assets.map((asset) => {
    return {
      tokenId: asset.token_id,
      type: asset.asset_contract.schema_name,
      name: asset.name,
      imageUrl: asset.image_url,
    };
  });

//   console.log(nftMetadata);

  const nftsByType = nftMetadata.reduce((result, nft) => {
    const type = nft.type;
    if (!result[type]) {
      result[type] = [];
    }
    result[type].push(nft);
    return result;
  }, {});

  // console.log(nftsByType);
  if (nftsByType.ERC1155) {
    // console.log(nftsByType.ERC1155);
    var found = nftsByType.ERC1155.find(item => item.name === 'student' || item.name === 'teacher');
    if (found) {
      if (found.name === 'student') {
        console.log(1); // 存在 name 属性值为 "student"
        return 1
      } else {
        console.log(2); // 存在 name 属性值为 "teacher"
        return 2
      }
    } else {
      console.log(0); // 不存在
      return 0
    }
  } else {
    console.log(0); // 不存在
    return 0
  }
}

module.exports = fetchNFTs;