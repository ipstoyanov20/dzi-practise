var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '192.168.0.1',
  user: 'html',
  password: 'password',
  database: 'sensors',
})
connection.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Database connected')
})
module.exports = connection