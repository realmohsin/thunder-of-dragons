const { Router } = require('express')

const generationRouter = new Router()

generationRouter.get('/', (req, res) => {
  const generation = req.app.locals.engine.generation
  res.json({ generation })
})

module.exports = generationRouter
