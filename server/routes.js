import express from 'express'
import http from 'http'
import path from 'path'
import fetch from 'node-fetch'
import 'dotenv/config';

const app = express()
const server = http.createServer(app)
const io = require('socket.io').listen(server)
const router = express.Router()
const { initialQuery } = require('./queries.js')

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'./../public/client/index.html'))
})

router.get('/git', (req, res) => {
  fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({query: initialQuery}),
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN_GITHUB}`,
    },
  }).then(res => res.text())
  .then(body => console.log(body))
  .catch(error => console.error(error));
  res.send('ok')
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

router.post('/listeningwebhook', function (req, res) {
  console.log(req.body)
  io.emit('listening webhook', JSON.parse(req.body.payload))
  res.send('ok')
})

router.use(function(req, res, next) {
  console.log('Page not found')
  next()
})

module.exports = router