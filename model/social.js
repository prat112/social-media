const Sequelize = require('sequelize');
const db = require('../util/database');

const Social = db.define('social', {
  postLink: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  postDescription: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
  },
  user: {
    type: Sequelize.STRING,
  },
  // Add a field for comments (assuming comments are stored as an array of strings)
  comments: {
    type: Sequelize.ARRAY(Sequelize.STRING), // Adjust the data type as needed
  },
});

module.exports = Social;