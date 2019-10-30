const express = require('express')
const log = require('morgan')('dev')
const favicon = require('express-favicon')
const bodyParser = require('body-parser')

const songSchema = require('./api/song/model')
require('./config/mongoose')
const songsRoutes = require('./api/song/routes')

const app = express()
app.use(favicon(__dirname + '/public/favicon.ico'))
const bodyParserJSON = bodyParser.json()
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true})
const router = express.Router()

app.use(express.static('public'))
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(log)
app.use(bodyParserJSON)
app.use(bodyParserURLEncoded)



app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
   res.setHeader("Access-Control-Allow-Credentials", "true")
   res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT")
   res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization")
 next()
});


app.use('/api', router)
songsRoutes(router)


app.listen(process.env.PORT || 4000)