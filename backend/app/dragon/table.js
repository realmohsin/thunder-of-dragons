const pool = require('../../databasePool')
const DragonTraitTable = require('../dragonTrait/table')

class DragonTable {
  static getDragon ({ dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT 
          birthdate, "dragonName", "generationId", "isPublic", "saleValue", "sireValue"
         FROM dragon
         WHERE dragon.id = $1`,
        [dragonId],
        (err, res) => {
          if (err) return reject(err)
          if (res.rows.length === 0) {
            return reject(new Error('No dragon found'))
          }
          resolve(res.rows[0])
        }
      )
    })
  }

  static storeDragon (dragon) {
    const {
      birthdate,
      dragonName,
      generationId,
      traits,
      isPublic,
      saleValue,
      sireValue
    } = dragon
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO dragon (birthdate, "dragonName", "generationId", "isPublic", "saleValue", "sireValue")
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [birthdate, dragonName, generationId, isPublic, saleValue, sireValue],
        (err, res) => {
          if (err) return reject(err)
          const dragonId = res.rows[0].id
          Promise.all(
            traits.map(({ traitType, traitValue }) => {
              return DragonTraitTable.storeDragonTrait({
                dragonId,
                traitType,
                traitValue
              })
            })
          )
            .then(() => resolve({ dragonId }))
            .catch(err => reject(err))
        }
      )
    })
  }

  static updateDragon ({
    dragonId,
    dragonName,
    isPublic,
    saleValue,
    sireValue
  }) {
    const settingsMap = { dragonName, isPublic, saleValue, sireValue }

    const validQueries = Object.entries(settingsMap).filter(
      ([settingKey, settingValue]) => {
        if (settingValue !== undefined) {
          return new Promise((resolve, reject) => {
            pool.query(
              `UPDATE dragon SET "${settingKey}" = $1 WHERE id = $2`,
              [settingValue, dragonId],
              (err, res) => {
                if (err) return reject(err)
                resolve()
              }
            )
          })
        }
      }
    )

    return Promise.all(validQueries)
  }
}

module.exports = DragonTable
