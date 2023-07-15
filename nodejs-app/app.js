const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/apis/nodeapp', (req, res) => {
  res.send('Hello World!')
})

module.exports = app