var express = require('express')
var app = express()
var DB = require('./lib/db')
// var bodyParser = require('body-parser')
// app.use(bodyParser.json())
app.engine('jade', require('jade').__express)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(express.static('assets'))

app.get('/', (req, res, next) => {
  res.render('index')
  next()
})


app.get('/dbs', (req, res, next) => {
  return Promise.all([
    DB.query(`select * from information_schema.columns where table_schema = 'dpjia_c2m_local'`),
    DB.query(`select TABLE_NAME,TABLE_COMMENT from information_schema.tables where table_schema='dpjia_c2m_local'`)
  ]).then(([dbs, tables]) => {
    res.send({
      dbs: dbs,
      tables: tables
    })
  })
})





app.listen(5012)
