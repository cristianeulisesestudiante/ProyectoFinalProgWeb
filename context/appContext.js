const Sequelize = require("sequelize");
const path = require("path");

const connection = new Sequelize("socialNet", "root", "carlos1213", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
