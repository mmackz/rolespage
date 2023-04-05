const fs = require("fs");
const path = require("path");

exports.csv = function (data, threshold) {
   let csv = "";

   const sortedPairs = Object.entries(data)
      .filter((address) => address[1] >= threshold)
      .sort((a, b) => b[1] - a[1]);

   for (const [address, number] of sortedPairs) {
      csv += `${address},${number}\n`;
   }

   return csv;
};

exports.json = function (data) {
   return new Promise((resolve, reject) => {
      fs.writeFile(
         path.join(__dirname, "../files/data.json"),
         JSON.stringify(data),
         (err) => {
            if (err) {
               reject(`Error writing JSON file: ${err}`);
            } else {
               resolve("JSON file saved.");
            }
         }
      );
   });
};
