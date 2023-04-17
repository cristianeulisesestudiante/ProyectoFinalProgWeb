const Sequelize = require("sequelize");
const sequelize = require("../context/cristContext");

const Notificaciones = sequelize.define("notificaciones", {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   usuarioSolicitadoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
});

module.exports = Notificaciones;
