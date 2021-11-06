require('dotenv').config()
let PORT = process.env.PORT||8080
let API_KEY = process.env.API_KEY||424243
let path = require('path')
let express = require('express')
let app = express()
let http = require('http').createServer(app)
let io = require('socket.io')(http)
let SerpApi= require('google-search-results-nodejs')
let search = new SerpApi.GoogleSearch(process.env.API_KEY)



//app config
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/dist','views'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('./dist'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/dist','index.html'))
})

app.post('/return-items',(req,res)=>{
    search.json({engine:'google',q:`${req.body.searchbar}`},(stuff)=>{
        res.render('results',{arr:stuff})
    })
})



io.on('connection',(socket)=>{
    console.log('connected');
    socket.on('client-send',(data)=>{
        search.json({engine:'google',q:`${data}`},(stuff)=>{
            socket.emit('server-send',stuff['organic_results'])
        })
        
    })
})


http.listen(PORT,()=>{
    console.log('server running');
})