var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '10.0.0.205',
  user: '12a_11',
  password: 'password',
  database: 'DB12a_11',
})
connection.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Database connected')
})
module.exports = connection