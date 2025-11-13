const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/chatapplication")

let db = mongoose.connection

db.on("error", function(){
    console.log("something wrong")
})

db.on("open", function(){
    console.log("connected")
})

module.exports = db

