const express = require('express')
const http = require('http')
const path = require('path')
const fetch = require('node-fetch')
const admin = require("firebase-admin")
require('dotenv').config()

const app = express()
const cors = require('cors')
app.use(express.static('public/'))
const router = express.Router()
const { infolayout, infodashboard, infoteam } = require('./queries.js')

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
  res.sendFile(path.join(__dirname+'./../public/client/index.html'))
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

router.get('/infoteam', cors(corsOptions), (req, res) => {
  fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({query: infoteam(req.query.slug)}),
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN_GITHUB}`,
    },
  }).then(res => res.text())
  .then(body => res.send(JSON.parse(body).data))
  .catch(error => console.error(error));
})

router.get('/getMostCommiter', cors(corsOptions), (req, res) => {

  var repos = [ "Caribbean-Digital", "Caribbean-Digital2", "Elemental-Brainers", "Elemental-Brainers2", "DeathCode", "CodeBrain" ]

  const start = async () => {
   var auxas = []
   var count = 0;
   await repos.forEach(function(repo, index) {

    fetch('https://api.github.com/repos/IHack2018/'+repo+'/stats/contributors', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN_GITHUB}`,
      }
    })
    .then(res => res.text())
    .then( body => {
      JSON.parse(body).forEach(function(item, index) {
        var add = 0;
        var delete_ = 0;

        item.weeks.forEach(function(week) {
          add = add + week.a;
          delete_ = delete_ + week.d;
        })

        if (auxas.length > 0) {
          if (auxas.find(s => s.author.login === item.author.login)) {
            let aux = auxas.find(s => s.author.login === item.author.login)
            let index = auxas.indexOf(aux);

            auxas[index].add = auxas[index].add + add
            auxas[index].delete = auxas[index].delete + delete_
            auxas[index].commits = auxas[index].commits + item.total

          }else{
            auxas.push({repository:repo, commits: item.total, add: add, delete: delete_, author: { login: item.author.login, avatar: item.author.avatar_url }});
         }
       }else{
         auxas.push({repository:repo, commits:item.total, add: add, delete: delete_, author: { login: item.author.login, avatar: item.author.avatar_url }});
       }

     })

      if (count === (repos.length -1)) {
        res.send(auxas)
      }
      count++

    })
    .catch(error => console.error(error));
  })
 }

 start();
})

router.post('/listeningwebhook', function (req, res) {
  var usersRef = ref.child("commits");
  if (JSON.parse(req.body.payload).head_commit.modified.length > 2) {
    usersRef.push().set(JSON.parse(req.body.payload).head_commit);
  }
  res.send('ok')
})

router.use(function(req, res, next) {
  console.log('Page not found')
  next()
})

module.exports = router