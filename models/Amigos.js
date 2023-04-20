const Sequelize = require("sequelize");
const connection = require("../context/connection");

const Amigos = connection.define("amigos", {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   usuarioId: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },

});

module.exports = Amigos;
