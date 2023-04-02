const fs = require("fs");
const path = require("path");

exports.csv = function (data) {
   let csv = "address,number\n";

   const sortedPairs = Object.entries(data).sort((a, b) => b[1] - a[1]);

   for (const [address, number] of sortedPairs) {
      csv += `${address},${number}\n`;
   }

   return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, "../files/output.csv"), csv, (err) => {
         if (err) {
            reject(`Error writing CSV file: ${err}`);
         } else {
            resolve("CSV file saved.");
         }
      });
   });
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
