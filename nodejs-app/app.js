const express = require('express')
const app = express()
const blogRouter = require("./Routes/BlogRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/apis/nodeapp", blogRouter);

app.get('/', (req, res) => {
  res.send('OK')
})

module.exports = app