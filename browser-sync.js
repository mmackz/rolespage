module.exports = {
   proxy: "http://localhost:3000",
   files: ["public/**/*.{html,js,css}", "views/**/*.pug"],
   logLevel: "debug",
   logFileChanges: true,
   reloadDelay: 300,
   reloadDebounce: 500,
   notify: true,
   open: false,
   ghostMode: false
};
