const Sequelize = require('sequelize');
const sequelize = new Sequelize('social-media','root','Karthik@26',{
    dialect:"mysql",host:'localhost'
})

module.exports = sequelize;

