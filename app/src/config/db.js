const mysql = require('mysql')

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'dkekdls12!',
  database: 'my_login',
  port: '3306',
})

db.connect()

module.exports = db
