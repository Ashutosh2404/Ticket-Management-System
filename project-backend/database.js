const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cookiiees_db', 'root', 'Ashu@2404', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // set true if you want query logs
});

module.exports = sequelize;
