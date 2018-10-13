const express = require('express')
const app = express()

var port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/listeningwebhook', function (req, res) {
  res.send(JSON.stringify(req))
})

app.listen(port, () => console.log('Example app listening on port 3000!'))
