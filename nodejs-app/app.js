const express = require('express')
const app = express()
const blogRouter = require("./Routes/BlogRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/blogs", blogRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/apis/nodeapp', (req, res) => {
  res.send('Hello World!')
})

module.exports = app