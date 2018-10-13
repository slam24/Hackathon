const express = require('express')
const app = express()

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/listeningwebhook', function (req, res) {
	console.log(req.body)
})

app.listen(port, () => console.log('Example app listening on port 3000!'))
