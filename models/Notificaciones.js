const Sequelize = require("sequelize");
const connection = require("../context/connection");

const Notificaciones = connection.define("notificaciones", {
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
