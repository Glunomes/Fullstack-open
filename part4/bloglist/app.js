const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const express = require('express')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const app = express()

mongoose.connect(MONGODB_URI, { family: 4 })
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.error('error connecting to MongoDB:', error.message))

app.use(middleware.tokenExtractor)
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app