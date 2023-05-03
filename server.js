const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer  = require('multer')
const upload = multer()
const errorHandler = require('./middleware/errorHandler')
const { logEvents, logger} = require('./middleware/logger')
const {port} = require('./appConfig.json')
const session = require('express-session')
const isAuth = require('./middleware/auth')
const path = require('path')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
var MongoDBStore = require('connect-mongodb-session')(session);
const {mongoURI} = require('./appConfig.json')
const {decrypt} = require('./utils/crypto')
connectDB()

var store = new MongoDBStore({
    uri: decrypt(mongoURI),
    collection: 'sessions'
    });

  // Catch errors
    store.on('error', function(error) {
    console.log(error);
    logEvents(`${error}`, 'dbErrLog.log')
    });


app.use(
    session({
        store: store,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
    secret: "peter griffin",
    })
)

app.use('/', express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
app.use(logger)
app.use('/mis',upload.none(),isAuth,require('./routes/misRoutes'))
app.use('/user',require('./routes/userRoutes'))
app.use('/',require('./routes/authRoutes'))
app.use('/signup',require('./routes/signUpRoute'))
app.use('/',isAuth,require('./routes/appRoutes'))


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.render('404')
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

app.listen(port,
    ()=>{
        console.log(`server running in port - ${port}`);
        logEvents(`Server running in ${port}`, 'infoLog.log')
    })

    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB')
    })
    
    mongoose.connection.on('error', err => {
        console.log(err)
        logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'dbErrLog.log')
    })
    
