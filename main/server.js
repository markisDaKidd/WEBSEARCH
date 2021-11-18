require('dotenv').config()
let cors = require('cors')
let PORT = process.env.PORT||8080
let API_KEY = process.env.API_KEY||424243
let path = require('path')
let express = require('express')
let app = express()
let http = require('http').createServer(app)
let io = require('socket.io')(http)
let SerpApi= require('google-search-results-nodejs')
let search = new SerpApi.GoogleSearch(API_KEY)
let fetch = require('node-fetch')
let id
let payload




//app config
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/dist','views'))
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('./dist'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/dist','index.html'))
})

app.post('/return-items',(req,res)=>{
    search.json({engine:'google',q:`${req.body.searchbar}`},(stuff)=>{
        payload = stuff['serpapi_pagination']
        res.render('results',{arr:stuff})
    })
})

app.post('/fetch',(req,res)=>{
    console.log(req.query);
    fetch(`https://serpapi.com/search.json?device=${req.query.device}&engine=${req.query.engine}&google_domain=${req.query.google_domain}&q=${req.query.q}&start=${req.query.start}&api_key=${API_KEY}`).then(resp=>resp.json()).then(resp=>{
        res.json(resp['organic_results'])
    }).catch(e=>console.log(e))



    // search.json({engine:'google',q:`${req.query.link}`},(stuff)=>{
    //     res.json(stuff['organic_results'])
    // })
})



io.on('connection',async (socket)=>{
    console.log('connected');
    id = await socket.id
    io.to(id).emit('incoming',payload)

        
})



http.listen(PORT,()=>{
    console.log('server running');
})