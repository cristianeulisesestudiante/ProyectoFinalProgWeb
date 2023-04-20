const { DataTypes } = require("sequelize");

const connection = require("../context/connection");

const Eventos = connection.define("eventos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaFinalizacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  lugar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
});

module.exports = Eventos;
