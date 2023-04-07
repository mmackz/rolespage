const fs = require("fs");
const path = require("path");

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
