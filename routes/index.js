const express = require("express");
const router = express.Router();
const path = require("path");

const rateLimit = require("express-rate-limit");
const updateData = require("../lib/get_data");

const limiter = rateLimit({
   windowMs: 100000, // 1 day
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

router.get("/download", (req, res, next) => {
   const filePath = "./lib/get_data/files/output.csv";
   res.download(filePath, "rh_quest_amounts.csv", (err) => {
      if (err) {
         console.error(err);
         res.status(404).send("File not found");
      }
   });
});

router.post("/update", async (req, res, next) => {
   const updated = await updateData();
   res.status(200).send(updated);
});

module.exports = router;
