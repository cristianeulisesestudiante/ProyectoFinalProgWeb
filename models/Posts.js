const Sequelize = require("sequelize");
const connection = require("../context/connection");

const Posts = connection.define("posts", {
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
  imagePath: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  usuarioId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Posts;
