const express = require('express')
const http = require('http')

const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
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
  console.log('Page not found');
  next();
});

module.exports = router;