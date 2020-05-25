const express = require('express')
const path = require('path')
const app = express()


app.use(express.static(path.join(__dirname )))

app.get('/',(req, res, next) =>{
    res.sendFile(path.join(__dirname + '/public/view/index.html'))
})

app.listen('3000', ()=>{
    console.log('run port: 3k' , Date.now());
    
})