const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())

mongoose.connect('mongodb+srv://delvin:1234@vermietemeinzuhause.ok6hsvn.mongodb.net/')
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Database connected'))

const stripeRouter = require('./router/stripeRouter')
app.use('/stripe', stripeRouter)

app.use(express.json())

const userRouter = require('./router/userRouter')
app.use('/user', userRouter)

const stripeJSONRouter = require('./router/stripeJSONRouter')
app.use('/jsonstripe', stripeJSONRouter)

const bookingRouter = require('./router/bookingRouter')
app.use('/booking', bookingRouter)


app.listen(3000, () => console.log('Server runs on 3000'))