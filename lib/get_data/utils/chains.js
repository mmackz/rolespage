require("dotenv").config();
const getData = require("./readFile");
const Web3 = require("web3");

const ethWeb3 = new Web3(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`);
const polygonWeb3 = new Web3(
   `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);
const optimismWeb3 = new Web3(
   `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);
const goerliWeb3 = new Web3(
   `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);

module.exports = () => {
   const { blocks } = getData();
   return [
      { web3: ethWeb3, firstBlock: blocks[0] + 1 },
      { web3: polygonWeb3, firstBlock: blocks[1] + 1 },
      { web3: optimismWeb3, firstBlock: blocks[2] + 1 },
      { web3: goerliWeb3, firstBlock: blocks[3] + 1 }
   ];
};
