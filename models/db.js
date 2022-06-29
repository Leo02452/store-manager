const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'StoreManager',
});

module.exports = db;