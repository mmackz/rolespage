const express = require("express");
const router = express.Router();

const rateLimit = require("express-rate-limit");
const updateData = require("../lib/get_data");
const getData = require("../lib/get_data/utils/readFile");

const limiter = rateLimit({
   windowMs: 3_600_000, // 1 hour
   max: 1,
   keyGenerator: () => "global",
   handler: function (req, res, next) {
      res.status(429).json("Too many requests");
   }
});

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

router.get("/update", limiter, async (req, res, next) => {
   const timestamp = await updateData();
   res.status(200).json(timestamp);
});

module.exports = router;
