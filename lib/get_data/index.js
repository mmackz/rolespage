const abi = require("./utils/abi");
const getChains = require("./utils/chains");
const getData = require("./utils/readFile");
const write = require("./utils/writeFile");

// Contract address
const contractAddress = "0x52629961f71c1c2564c5aa22372cb1b9fa9eba3e";

// Number of blocks per api call
const limit = 1500;

module.exports = async () => {
   // Variables to store results to put in json format
   const data = { latestBlock: [] };
   const { results } = getData();
   let num = 0;

   try {
      const chains = getChains();
      for (const [index, chain] of chains.entries()) {
         const { web3, firstBlock } = chain;
         const contract = new web3.eth.Contract(abi, contractAddress);
         const latestBlock = await web3.eth.getBlockNumber();

         let fromBlock = firstBlock;
         let toBlock = fromBlock + limit;

         data.latestBlock[index] = latestBlock;

         while (fromBlock < latestBlock) {
            const offset = fromBlock === firstBlock ? 0 : 1;

            const events = await contract.getPastEvents("ReceiptMinted", {
               fromBlock: fromBlock + offset,
               toBlock
            });

            for (let event of events) {
               const address = event.returnValues.recipient;
               results[address] = results[address] ?? 0;
               results[address] += 1;
               num++;
            }

            const nextBlocks = getNextFirstBlocks(fromBlock, latestBlock);

            fromBlock = nextBlocks[0];
            toBlock = nextBlocks[1];
         }
      }

      console.log(num + " events added");

      data.results = results;
      data.timestamp = Date.now();

      console.log(await write.json(data));
      return data.timestamp;
   } catch (err) {
      console.error(err);
      return "There was an error collecting the results"
   }
};

function getNextFirstBlocks(prevFirst, latestBlock) {
   return [
      prevFirst + limit + 1 < latestBlock ? prevFirst + limit : latestBlock,
      prevFirst + limit * 2 < latestBlock ? prevFirst + limit * 2 : latestBlock
   ];
}
