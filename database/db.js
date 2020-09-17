const appModules = require('../config/appModules'); //Import the required modules.
require('dotenv').config() //Config the dotenv file.
const mysql = require('mysql')
/***
 * Import all the required credentials for the connection of database
 */
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

//Create a connection object
const connection = mysql.createPool({
    connectionLimit: 100,
    host,
    user,
    password,
    database,
    multipleStatements: true
});


//   connection.connect(function(err) {
//     if (err) {
//       return console.error('error: ' + err.message);
//     }
  
//     console.log('Connected to the MySQL server.');
//   });
 

module.exports.connection = connection; //Export the connection object so that we can use it in the project