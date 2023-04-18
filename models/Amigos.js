const Sequelize = require("sequelize");
const sequelize = require("../context/cristContext");

const Amigos = sequelize.define("amigos", {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   usuarioAmigoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
   id_usuario: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
});

module.exports = Amigos;
