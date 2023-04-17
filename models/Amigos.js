const Sequelize = require("sequelize");
const sequelize = require("../context/cristContext");

const Amigos = sequelize.define("amigos", {
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

module.exports = Comentarios;
