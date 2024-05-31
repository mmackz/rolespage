require("dotenv").config();
const getData = require("./readFile");
const Web3 = require("web3");

const ethWeb3 = new Web3(
   `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);
const polygonWeb3 = new Web3(
   `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);
const optimismWeb3 = new Web3(
   `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);
const arbWeb3 = new Web3(
   `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);
const baseWeb3 = new Web3(
   `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);
const zoraWeb3 = new Web3(
   `https://zora-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);
const blastWeb3 = new Web3(
   `https://blast-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);

module.exports = () => {
   const { blocks } = getData();
   return [
      { web3: ethWeb3, firstBlock: blocks[0] + 1, limit: 2000 },
      { web3: polygonWeb3, firstBlock: blocks[1] + 1, limit: 2000 },
      { web3: optimismWeb3, firstBlock: blocks[2] + 1, limit: 2000 },
      { web3: arbWeb3, firstBlock: blocks[3] + 1, limit: 2000 },
      { web3: baseWeb3, firstBlock: blocks[4] + 1, limit: 2000 },
      { web3: zoraWeb3, firstBlock: blocks[5] + 1, limit: 2000 }, 
      { web3: blastWeb3, firstBlock: blocks[6] + 1, limit: 2000 },
   ];
};
