const mongoose = require("mongoose");

//configure mongoose
const env = process.env
const user = env.MONGODB_USERNAME
const pass = env.MONGODB_PASSWORD
const url = env.MONGODB_URL
const db = env.MONGODB_DATABASE

const final_url = "mongodb://" + user + ":" + pass + "@" + url + "/" + db

if (user && pass && url && db) {
    console.log("Connecting on " + final_url)
    exports.connect = async () => { return await mongoose.connect(
        final_url,
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