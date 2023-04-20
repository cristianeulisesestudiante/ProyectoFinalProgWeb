const Sequelize = require("sequelize");
const connection = require("../context/connection");

const Usuarios = connection.define("usuarios", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  apellido: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefono: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image_path: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  correo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nombre_user: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  estado: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  resetToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  resetTokenExpiration: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

module.exports = Usuarios;