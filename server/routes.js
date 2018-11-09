const express = require('express')
const http = require('http')
const path = require('path')
const fetch = require('node-fetch')
const admin = require("firebase-admin")
require('dotenv').config()

const app = express()
const cors = require('cors')
app.use(express.static('public/'))
const server = http.createServer(app)
const io = require('socket.io').listen(server)
const router = express.Router()
const { infolayout, infodashboard } = require('./queries.js')

var whitelist = ['http://localhost:4200', 'http://localhost:3000', 'https://inatec-hackathon-2018.herokuapp.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true)
    }
  }
}
var serviceAccount = require("../hackathon2018-8ee72-firebase-adminsdk-a65w8-ff81cdee22.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hackathon2018-8ee72.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/");

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'./../public/index.html'))
})

router.get('/infolayout', cors(corsOptions), (req, res) => {
  fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({query: infolayout}),
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN_GITHUB}`,
    },
  }).then(res => res.text())
  .then(body => res.send(JSON.parse(body).data))
  .catch(error => console.error(error));
})

router.get('/infodashboard', cors(corsOptions), (req, res) => {
  fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({query: infodashboard}),
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN_GITHUB}`,
    },
  }).then(res => res.text())
  .then(body => res.send(JSON.parse(body).data))
  .catch(error => console.error(error));
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

router.post('/listeningwebhook', function (req, res) {
  console.log(req.body)
  var usersRef = ref.child("commits");
  if (JSON.parse(req.body.payload).head_commit.modified.length > 2) {
    usersRef.set(JSON.parse(req.body.payload).head_commit);
  }
  io.emit('listening webhook', JSON.parse(req.body.payload))
  res.send('ok')
})

router.use(function(req, res, next) {
  console.log('Page not found')
  next()
})

module.exports = router