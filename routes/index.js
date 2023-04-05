const express = require("express");
const router = express.Router();

const rateLimit = require("express-rate-limit");
const updateData = require("../lib/get_data");
const write = require("../lib/get_data/utils/writeFile");
const getData = require("../lib/get_data/utils/readFile");

const limiter = rateLimit({
   windowMs: 300000, // 5 minute
   max: 1, // limit to 1 request per windowMs
   keyGenerator: function (req) {
      // use the same key for all requests
      return "global";
   },
   handler: function (req, res, next) {
      res.status(429).json("Too many requests");
   }
});

/* GET home page. */
router.get("/", (req, res, next) => {
   const { timestamp } = getData();
   res.render("index", { timestamp });
});

router.get("/download", async (req, res, next) => {
   const threshold = parseInt(req.query.threshold);
   const { timestamp } = getData();
   const { results } = getData();
   const csv = write.csv(results, threshold);

   // Get the current date/time to include in the filename
   const now = new Date(timestamp);
   const month = now.getMonth() + 1;
   const day = now.getDate();
   const hour = now.getHours();
   const minute = now.getMinutes();

   // Set the filename to include the date and threshold value
   const filename = `${month}_${day}_${hour}${minute}_quests_${threshold}.csv`;

   // Set the response headers to indicate that a CSV file is being downloaded
   res.setHeader("Content-Type", "text/csv");
   res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

   // Send the CSV data as a response
   res.send(csv);
});

router.post("/update", limiter, async (req, res, next) => {
   const timestamp = await updateData();
   res.status(200).json(timestamp);
});

module.exports = router;
