const Sequelize = require('sequelize');
const config = require('../config/config.json').development;
const models = require('../models');
// console.log(config);

// const firebase = require('firebase');
// const firebaseApp = firebase.initializeApp(config.firebase);

const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: config.pool
});

// const db = new Sequelize('gokoncentrate','root','',{
//   host: 'localhost',
//   dialect:'mysql',
//   port:3307
// })


db.sync();
db.models = models;

module.exports = db;