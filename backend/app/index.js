const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const Engine = require('./generation/engine')
const accountRouter = require('./api/account')
const dragonRouter = require('./api/dragon')
const generationRouter = require('./api/generation')

const app = express()
const engine = new Engine()

app.locals.engine = engine

app.use(cors({ origin: 'http://localhost:8080', credentials: true }))
app.use(cookieParser())
app.use(express.json())

app.use('/account', accountRouter)
app.use('/dragon', dragonRouter)
app.use('/generation', generationRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    type: 'error',
    message: err.message
  })
})

engine.start()

module.exports = app
