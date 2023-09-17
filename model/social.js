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
});

module.exports = Social;