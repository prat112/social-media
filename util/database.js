const Sequelize = require('sequelize');
const sequelize = new Sequelize('social-media2','root','Karthik@26',{
    dialect:"mysql",host:'localhost'
})

module.exports = sequelize;

