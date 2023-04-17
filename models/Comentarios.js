const Sequelize = require("sequelize");
const sequelize = require("../context/cristContext");

const Comentarios = sequelize.define("comentarios", {
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
