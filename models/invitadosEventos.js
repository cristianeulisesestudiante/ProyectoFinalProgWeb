const { DataTypes } = require("sequelize");

const connection = require("../context/connection");

const InvitadosEventos = connection.define("InvitadosEventos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_invitado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  aceptado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = InvitadosEventos;
