const express = require("express");
const router = express.Router();

const getData = require("../lib/get_data/utils/readFile");

/* GET home page. */
router.get("/", (req, res, next) => {
   const { timestamp, results } = getData();
   const addresses = Object.values(results).filter((num) => num >= 30).length;
   res.render("index", { timestamp, addresses });
});

router.get("/get_data", async (req, res, next) => {
   const { results } = getData();
   res.status(200).json(
      Object.entries(results)
         .filter((address) => address[1] >= 10)
         .sort((a, b) => b[1] - a[1])
   );
});

module.exports = router;
