const Dragon = require('../dragon')
const { REFRESH_RATE, MS_IN_SECOND } = require('../config')

const refreshRate = REFRESH_RATE * MS_IN_SECOND

class Generation {
  constructor () {
    this.accountIds = new Set()
    this.expiration = this._calculateExpiration()
    this.generationId = undefined
  }

  _calculateExpiration () {
    const varianceValue = Math.floor(Math.random() * (refreshRate / 2))
    const msUntilExpiration =
      Math.random() < 0.5
        ? refreshRate - varianceValue
        : refreshRate + varianceValue
    return new Date(Date.now() + msUntilExpiration)
  }

  newDragon ({ accountId }) {
    if (Date.now() > this.expiration) {
      throw new Error(`This generation expired on ${this.expiration}`)
    }

    if (this.accountIds.has(accountId)) {
      throw new Error('You already have a dragon from this generation')
    }

    this.accountIds.add(accountId)

    return new Dragon({ generationId: this.generationId })
  }
}

module.exports = Generation
