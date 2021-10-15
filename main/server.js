require('dotenv').config()
let PORT = process.env.PORT||8080
let API_KEY = process.env.API_KEY||424243
let path = require('path')
let express = require('express')
let app = express()
let http = require('http').createServer(app)
let io = require('socket.io')(http)



//app config
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/dist','views'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('dist'))




io.on('connection',(socket)=>{
    console.log('connected');
})


http.listen(PORT,()=>{
    console.log('server running');
})