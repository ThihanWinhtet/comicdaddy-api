const Comics = require("../routes/comics");
const express = require("express");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/comics", Comics);
};
