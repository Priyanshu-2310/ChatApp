const express = require('express')
const app = express()
const http = require('http')
const  {Server} =  require('socket.io')
const cors = require('cors')
const mongooseconnection = require('./config/mongoconfig')
require('dotenv').config()


// routeimports
const authRoute = require('./routes/authRoute')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})


// routes

app.use('/api/auth', authRoute)



server.listen(3000, ()=>{
    console.log("server is running at 3000 port")
})