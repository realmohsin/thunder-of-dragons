const pool = require('../../databasePool')

class AccountDragonTable {
  static storeAccountDragon ({ accountId, dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO "accountDragon" ("accountId", "dragonId")
         VALUES ($1, $2)`,
        [accountId, dragonId],
        (err, res) => {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }

  static getAccountDragons ({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT "dragonId" FROM "accountDragon"
         WHERE "accountId" = $1`,
        [accountId],
        (err, res) => {
          if (err) return reject(err)
          resolve({ accountDragons: res.rows })
        }
      )
    })
  }

  static getDragonAccount ({ dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT "accountId" FROM "accountDragon" WHERE "dragonId" = $1`,
        [dragonId],
        (err, res) => {
          if (err) return reject(err)
          resolve({ accountId: res.rows[0].accountId })
        }
      )
    })
  }

  static updateDragonAccount ({ dragonId, accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE "accountDragon" SET "accountId" = $1
         WHERE "dragonId" = $2`,
        [accountId, dragonId],
        (err, res) => {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }
}

module.exports = AccountDragonTable
