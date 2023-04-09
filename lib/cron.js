// required modules
const cron = require("node-cron");
const getData = require("./get_data");

// scrape quest data every 6 hours
cron.schedule("0 */6 * * *", getData);
