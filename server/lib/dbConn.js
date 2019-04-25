var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'pass',
  database : 'db_training',
  insecureAuth : true
});

module.exports = connection;

