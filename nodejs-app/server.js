const app = require('./app')
const port = 3000
const connection = require('./MongooseController/connection')

connection.connect()
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.log(err);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })