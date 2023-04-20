const Sequelize = require("sequelize");
const connection = require("../context/connection");

const Respuestas = connection.define("respuestas", {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   description: {
      type: Sequelize.STRING,
      allowNull: false,
   },
});

module.exports = Respuestas;
