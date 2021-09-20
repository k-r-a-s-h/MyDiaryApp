const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const logger = require('morgan')
const cors =require('cors')
const config = require('dotenv').config()


const login = require('./routes/login')
const logout = require('./routes/logout')
const signUp = require('./routes/signup')
const diaryNote = require('./routes/diaryNote')
const app = express()

//constants
const port = process.env.PORT
const oneDay = 1000*60*60*24
//const corsOptions ={ origin:'*', credentials:true, }//access-control-allow-credentials:true, optionSuccessStatus:200, }

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(sessions({
    //TODO: move to enviroment varaibles
    secret: "SomethingSecret",
    saveUninitialized : true,
    cookie: {maxAge:oneDay},
    resave: false
}))
app.use(logger('dev'))
app.use(cors())
//mongoose connection
const connectionString = 'mongodb+srv://'+process.env.DB_NAME+':'+process.env.DB_PASSWORD+''+'@cluster0.zn0tq.mongodb.net/DiaryApp'
mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((response)=>{
        console.log(`Connected to MongoDB`)
        app.listen(port,()=>{console.log(`Connected to port ${port}`)})
    })
    .catch((err)=>{
        console.log(err)
    })
//Routes
app.use('/login',login)
app.use('/signup',signUp)
app.use('/note',diaryNote)

app.use(function (err, req, res, next) {
    console.error(err)
    res.status(err.status || 500);
    res.json({error:err.message});
});









