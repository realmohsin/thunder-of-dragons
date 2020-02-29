const { Router } = require('express')
const AccountTable = require('../account/table')
const Session = require('../account/session')
const { hash } = require('../account/helper')
const { setSession, isAuth } = require('./helper')
const AccountDragonTable = require('../accountDragon/table')
const { getDragonWithTraits } = require('../dragon/helper')

const accountRouter = new Router()

accountRouter.post('/signup', (req, res, next) => {
  const { username, password } = req.body
  const usernameHash = hash(username)
  const passwordHash = hash(password)

  AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
      if (!account) {
        return AccountTable.storeAccount({ usernameHash, passwordHash })
      } else {
        const err = new Error('This username has already been taken')
        err.statusCode = 409
        throw err
      }
    })
    .then(() => {
      return setSession({ username, res }) // no sessionId being passed, since new account
    })
    .then(({ message }) => {
      res.json({ message })
    })
    .catch(err => next(err))
})

accountRouter.post('/login', (req, res, next) => {
  const { username, password } = req.body

  AccountTable.getAccount({ usernameHash: hash(username) })
    .then(({ account }) => {
      if (account && account.passwordHash === hash(password)) {
        const { sessionId } = account
        return setSession({ username, res, sessionId })
      } else {
        const error = new Error('Incorrect username/password')
        error.statusCode = 409
        throw error
      }
    })
    .then(({ message }) => res.json({ message }))
    .catch(err => next(err))
})

accountRouter.post('/logout', (req, res, next) => {
  const { username } = Session.parse(req.cookies.sessionString)

  AccountTable.updateSessionId({
    sessionId: null,
    usernameHash: hash(username)
  })
    .then(() => {
      res.clearCookie('sessionString') // clear cookie from client
      res.json({ message: 'Successful logout' })
    })
    .catch(err => next(err))
})

accountRouter.get('/auth-status', (req, res, next) => {
  const sessionString = req.cookies.sessionString

  isAuth({ sessionString })
    .then(({ isAuth, account }) => {
      if (isAuth) {
        res.json({ message: { isAuth: true } })
      } else {
        res.clearCookie('sessionString')
        res.json({ message: { isAuth: false } })
      }
    })
    .catch(err => next(err))
})

accountRouter.get('/dragons', (req, res, next) => {
  const sessionString = req.cookies.sessionString
  isAuth({ sessionString })
    .then(({ isAuth, account }) => {
      if (!isAuth) throw new Error('Not Authenticated')
      return AccountDragonTable.getAccountDragons({ accountId: account.id })
    })
    .then(({ accountDragons }) => {
      return Promise.all(
        accountDragons.map(accountDragon => {
          return getDragonWithTraits({ dragonId: accountDragon.dragonId })
        })
      )
    })
    .then(dragons => {
      res.json({ dragons })
    })
    .catch(err => next(err))
})

accountRouter.get('/info', (req, res, next) => {
  const sessionString = req.cookies.sessionString
  isAuth({ sessionString })
    .then(({ account, username }) => {
      res.json({ info: { balance: account.balance, username } })
    })
    .catch(err => next(err))
})

module.exports = accountRouter
