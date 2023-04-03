const fs = require("fs");
const path = require("path");

module.exports = () => {
   let data;

   try {
      const jsonString = fs.readFileSync(
         path.join(__dirname, "../files/data.json"),
         "utf8"
      );
      data = JSON.parse(jsonString);
   } catch (err) {
      console.log("Error reading file:", err);
   }
   return { blocks: data.latestBlock, results: data.results, timestamp: data.timestamp };
};
