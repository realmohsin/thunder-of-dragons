const TRAITS = require('../../data/traits.json')

const DEFAULT_PROPERTIES = {
  dragonId: undefined,
  dragonName: 'Anonymous',
  generationId: undefined,
  isPublic: false,
  saleValue: 0,
  sireValue: 0,
  get birthdate () {
    return new Date()
  },
  get randomTraits () {
    const traits = TRAITS.map(TRAIT => {
      const traitType = TRAIT.type
      const traitValue =
        TRAIT.values[Math.floor(Math.random() * TRAIT.values.length)]
      return { traitType, traitValue }
    })
    return traits
  }
}

class Dragon {
  constructor ({
    dragonId,
    dragonName,
    birthdate,
    traits,
    generationId,
    isPublic,
    saleValue,
    sireValue
  } = {}) {
    this.dragonId = dragonId || DEFAULT_PROPERTIES.dragonId
    this.dragonName = dragonName || DEFAULT_PROPERTIES.dragonName
    this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate
    this.traits = traits || DEFAULT_PROPERTIES.randomTraits
    this.generationId = generationId || DEFAULT_PROPERTIES.generationId
    this.isPublic = isPublic || DEFAULT_PROPERTIES.isPublic
    this.saleValue = saleValue || DEFAULT_PROPERTIES.saleValue
    this.sireValue = sireValue || DEFAULT_PROPERTIES.sireValue
  }
}

module.exports = Dragon
