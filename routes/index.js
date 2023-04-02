const express = require("express");
const router = express.Router();
const path = require("path");

const rateLimit = require("express-rate-limit");
const updateData = require("../lib/get_data");

const limiter = rateLimit({
   windowMs: 300000, // 5 minute
   max: 1, // limit to 1 request per windowMs
   keyGenerator: function (req) {
      // use the same key for all requests
      return "global";
   },
   handler: function (req, res, next) {
      res.render("index", {
         title: "Express",
         resetTime: req.rateLimit.resetTime,
         error: "Rate limit exceeded!"
      });
   }
});

/* GET home page. */
router.get("/", (req, res, next) => {
   res.render("index");
});

router.post("/download", (req, res, next) => {
   const filePath = "./lib/get_data/files/output.csv";
   res.download(filePath, "rh_quest_amounts.csv", (err) => {
      if (err) {
         console.error(err);
         res.status(404).json("File not found");
      }
   });
});

router.post("/update", limiter, async (req, res, next) => {
   const updated = await updateData();
   res.status(200).json(updated);
});

module.exports = router;
