const express = require("express");
const router = express.Router();

const getData = require("../lib/get_data/utils/readFile");

/* GET home page. */
router.get("/", (req, res, next) => {
   const { timestamp, results } = getData();
   const addresses = Object.values(results).filter((num) => num >= 30).length;
   res.render("index", { timestamp, addresses });
});

router.get("/get_data", async (req, res) => {
   const { results } = getData();
   res.status(200).json(
      Object.entries(results)
         .filter((address) => address[1] >= 10)
         .sort((a, b) => b[1] - a[1])
   );
});

router.get("/allowlist", async (req, res) => {
   const { query } = req;
   const { results } = getData();
   let threshold = 20;
   if (query.hasOwnProperty("threshold")) {
      const param = query.threshold;
      const paramValue = parseInt(param);

      if (Number.isInteger(paramValue) && paramValue >= 10) {
         threshold = paramValue;
      }
   }
   const allowlist = Object.entries(results)
      .filter((address) => address[1] >= threshold)
      .sort((a, b) => b[1] - a[1])
      .map((address) => address[0]);
   res.status(200).json(allowlist);
});

module.exports = router;
