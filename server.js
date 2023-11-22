const express = require('express')
const chars = require('./admin.js');
const users = require('./users.js');
var bodyParser = require('body-parser');

const app = express()
const port = 3000
const cors = require('cors');

app.use(bodyParser.json());

app.use('/',chars);
app.use('/', users);
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/admin', (req, res) => {
  res.send('HelloWorld!')
})

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, POST"
}

app.use(cors(corsOptions));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})