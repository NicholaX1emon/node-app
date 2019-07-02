const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

// DB Config
const db = require('./config/keys').mongoURL

// Use Body-Parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Use Routes
const userRoute = require('./routes/api/user')
const profileRoute = require('./routes/api/profile')

// Initialize & Use Passport for token
app.use(passport.initialize())
require('./config/passport')(passport)

// Connect to DB
mongoose.connect(db)
        .then(() => {
          console.log('---------------- MongoDB Connected ----------------')
        })
        .catch(err=> {
          console.error(err)
        })

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`---------------- server running on port ${port} ----------------`)
})

app.get('/', (req, res) => {
  console.log(`Get - ${req.baseUrl}`)
  res.send('Hello Node')
})

app.use('/api/user', userRoute) // refers to route function --> router.get() --> /api/user/test
app.use('/api/profile', profileRoute)