const Sequelize = require("sequelize");
const sequelize = require("../context/cristContext");

const Posts = sequelize.define("posts", {
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
});

module.exports = Posts;
