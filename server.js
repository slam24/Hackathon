const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')

const router = require('./server/routes.js')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public/'))
app.use('/', router)

server.listen(port, () => console.log('Example app listening on port 3000!'))
