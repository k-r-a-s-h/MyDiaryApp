const express = require('express')
const mongoose = require('mongoose')

const login = require('./routes/login')
const signUp = require('./routes/signup')
const app = express()
const port = 3000

// const connectionString = 'mongodb+srv://trialWithDB:ENGWdHpFbB1fz03E@cluster0.zn0tq.mongodb.net/DiaryApp'
// mongoose.connect(connectionString)
//     .then((response)=>{
//         console.log(`Connected to MongoDB`)
//         console.log(`Connected to port ${port}`)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
app.use('/login',login)
app.use('/signup',signUp)

app.listen(port,()=>{
    console.log(`Connected to port ${port}`)
})







