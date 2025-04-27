const Comics = require("../routes/comics");

module.exports = function (app) {
  app.use("/api/routes", Comics);
};
