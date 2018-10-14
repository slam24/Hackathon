const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io').listen(server)

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

app.post('/listeningwebhook', function (req, res) {
  console.log(req.body)
  io.emit('listening webhook', JSON.parse(req.body.payload));
  res.send('ok')
})

server.listen(port, () => console.log('Example app listening on port 3000!'))
