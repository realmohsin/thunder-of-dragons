const Session = require('../account/session')
const AccountTable = require('../account/table')
const { hash } = require('../account/helper')

const setSession = ({ username, res, sessionId }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString
    if (sessionId) {
      sessionString = Session.sessionString({ username, id: sessionId })
      setSessionCookie({ sessionString, res })
      resolve({ message: 'session restored' })
    } else {
      session = new Session({ username })
      sessionString = session.toString()

      AccountTable.updateSessionId({
        sessionId: session.id,
        usernameHash: hash(username)
      })
        .then(() => {
          setSessionCookie({ sessionString, res })
          resolve({ message: 'session created ' })
        })
        .catch(err => reject(err))
    }
  })
}

const setSessionCookie = ({ sessionString, res }) => {
  res.cookie('sessionString', sessionString, {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true
    // secure: true
  })
}

const isAuth = ({ sessionString }) => {
  return new Promise((resolve, reject) => {
    if (sessionString) {
      const { username, id } = Session.parse(sessionString)
      AccountTable.getAccount({ usernameHash: hash(username) })
        .then(({ account }) => {
          if (Session.verify(sessionString) && account.sessionId === id) {
            resolve({ isAuth: true, account, username })
          } else {
            resolve({ isAuth: false, account: null })
          }
        })
        .catch(err => reject(err))
    } else {
      resolve({ isAuth: false, account: null })
    }
  })
}

module.exports = { setSession, isAuth }
