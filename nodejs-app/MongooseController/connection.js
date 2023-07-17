const mongoose = require("mongoose");

//configure mongoose
const env = process.env
const user =env.MONGODB_USERNAME
const pass =env.MONGODB_PASSWORD
const url =env.MONGODB_URL
const db =env.MONGODB_DATABASE

if (user && pass && url && db) {
    exports.connect = async () => { return await mongoose.connect(
        `mongodb://${user}:${pass}@${url}/${db}`,
       {
           useNewUrlParser: true,
           useUnifiedTopology: true,
       }
   )}
} else {
    exports.connect = async () => { return await mongoose.connect(
        "mongodb://user:password@localhost/main",
       {
           useNewUrlParser: true,
           useUnifiedTopology: true,
       }
   )}
}


exports.disconnect = async () => {
    return await mongoose.disconnect()
}