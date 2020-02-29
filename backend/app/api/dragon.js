const { Router } = require('express')
const DragonTable = require('../dragon/table')
const AccountTable = require('../account/table')
const AccountDragonTable = require('../accountDragon/table')
const Breeder = require('../dragon/breeder')
const { isAuth } = require('./helper')
const { getPublicDragons, getDragonWithTraits } = require('../dragon/helper')

const dragonRouter = new Router()

dragonRouter.get('/new', (req, res, next) => {
  let accountId, dragon
  const sessionString = req.cookies.sessionString

  isAuth({ sessionString })
    .then(({ isAuth, account }) => {
      if (!isAuth) throw new Error('Not authenticated')

      accountId = account.id

      dragon = req.app.locals.engine.generation.newDragon({
        accountId
      })

      return DragonTable.storeDragon(dragon)
    })
    .then(({ dragonId }) => {
      dragon.dragonId = dragonId

      return AccountDragonTable.storeAccountDragon({ accountId, dragonId })
    })
    .then(() => {
      res.json({ dragon })
    })
    .catch(err => next(err))
})

dragonRouter.put('/update', (req, res, next) => {
  const { dragonId, dragonName, isPublic, saleValue, sireValue } = req.body

  DragonTable.updateDragon({
    dragonId,
    dragonName,
    isPublic,
    saleValue,
    sireValue
  })
    .then(() => res.json({ message: 'successfuly updated dragon' }))
    .catch(err => next(err))
})

dragonRouter.get('/public-dragons', (req, res, next) => {
  getPublicDragons()
    .then(({ dragons }) => res.json({ dragons }))
    .catch(err => {
      next(err)
    })
})

dragonRouter.post('/buy', async (req, res, next) => {
  const { dragonId, saleValue } = req.body
  const sessionString = req.cookies.sessionString

  try {
    const { isAuth: isAuthenticated, account: buyerAccount } = await isAuth({
      sessionString
    })
    if (!isAuthenticated) throw new Error('Not authenticated')
    if (buyerAccount.balance < saleValue) throw new Error('Not enough gold')

    const dragon = await DragonTable.getDragon({ dragonId })
    if (dragon.saleValue !== saleValue) throw new Error('Sale Value incorrect')
    if (!dragon.isPublic) throw new Error('Dragon must be public')

    const { accountId: sellerId } = await AccountDragonTable.getDragonAccount({
      dragonId
    })

    if (sellerId === buyerAccount.id)
      throw new Error('Cannot buy your own dragon')

    await Promise.all([
      AccountTable.updateBalance({ accountId: sellerId, value: saleValue }),
      AccountTable.updateBalance({
        accountId: buyerAccount.id,
        value: -saleValue
      }),
      AccountDragonTable.updateDragonAccount({
        dragonId,
        accountId: buyerAccount.id
      }),
      DragonTable.updateDragon({ dragonId, isPublic: false })
    ])

    res.json({ message: 'successful purchase ' })
  } catch (error) {
    next(error)
  }
})

dragonRouter.post('/mate', (req, res, next) => {
  // matron is request senders dragon
  const { matronDragonId, patronDragonId } = req.body

  if (matronDragonId === patronDragonId) {
    throw new Error('Cannot breed with the same dragon')
  }

  let matronDragon, patronDragon, patronSireValue
  let matronAccountId, patronAccountId

  getDragonWithTraits({ dragonId: patronDragonId })
    .then(dragon => {
      if (!dragon) throw new Error('Patron dragon does not exist')

      if (!dragon.isPublic) {
        throw new Error('Dragon must be public')
      }
      patronDragon = dragon
      patronSireValue = dragon.sireValue
      return getDragonWithTraits({ dragonId: matronDragonId })
    })
    .then(dragon => {
      matronDragon = dragon
      return isAuth({ sessionString: req.cookies.sessionString })
    })
    .then(({ account, isAuth }) => {
      if (!isAuth) throw new Error('unauthenticated')
      if (patronSireValue > account.balance) {
        throw new Error('Sire value exceeds balance')
      }
      matronAccountId = account.id

      return AccountDragonTable.getDragonAccount({ dragonId: patronDragonId })
    })
    .then(({ accountId }) => {
      patronAccountId = accountId

      if (matronAccountId === patronAccountId) {
        throw new Error('Cannot breed your own dragons')
      }

      const dragon = Breeder.breedDragon({
        matron: matronDragon,
        patron: patronDragon
      })

      return DragonTable.storeDragon(dragon)
    })
    .then(({ dragonId }) => {
      Promise.all([
        AccountTable.updateBalance({
          accountId: matronAccountId,
          value: -patronSireValue
        }),
        AccountTable.updateBalance({
          accountId: patronAccountId,
          value: patronSireValue
        }),
        AccountDragonTable.storeAccountDragon({
          dragonId,
          accountId: matronAccountId
        })
      ])
    })
    .then(() => res.json({ message: 'successful breeding' }))
    .catch(err => next(err))
})

module.exports = dragonRouter
