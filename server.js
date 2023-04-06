const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer  = require('multer')
const upload = multer()
const errorHandler = require('./middleware/errorHandler')
const { logEvents, logger} = require('./middleware/logger')
const {port} = require('./appConfig.json')
const session = require('express-session')
const {createClient} = require('redis')
const RedisStore = require("connect-redis").default
const isAuth = require('./middleware/auth')
let redisClient = createClient()
const path = require('path')


redisClient.connect().catch((err)=>{
    console.log(`${err.name}:${err.message}`);
    logEvents(`${err.name}: ${err.message}`, 'errLog.log')
})

redisClient.on("ready", function() {
    console.log("Redis Connection Successfully Established")
    logEvents(`Redis Connection Successfully Established`, 'infoLog.log')
})

redisClient.on("error", function(error) {
    logEvents(`Redis Connection: Socket Closed Unexpectedly`, 'errLog.log')
});
redisClient.on("end", function() {
    logEvents(`Redis Connection Terminated`, 'infoLog.log')
})

// Initialize store.
let redisStore = new RedisStore({
client: redisClient,
prefix: "tool.db_session:",
})

app.use(
    session({
        store: redisStore,
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

    
