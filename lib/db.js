var mysql = require('mysql')



module.exports = {
  query: (queryStr) => {
    var connection = mysql.createConnection({
      host: '192.168.1.120',
      user: 'root',
      database: 'dpjia_c2m'
    })

    connection.connect()

    return new Promise(resolve => {
      connection.query(queryStr,  (error, results, fields) => {
        connection.end()
        resolve(results)
      })
    })
  }
}
