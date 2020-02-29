const Generation = require('./index')
const GenerationTable = require('./table')

class Engine {
  constructor () {
    this.generation = null
  }

  start () {
    this._chainCreateGeneration()
  }

  stop () {
    clearTimeout(this.timeoutId)
  }

  _chainCreateGeneration () {
    const generation = new Generation()

    GenerationTable.storeGeneration(generation)
      .then(({ generationId }) => {
        this.generation = generation
        this.generation.generationId = generationId

        console.log(
          'New Generation: ',
          JSON.stringify(this.generation, null, 2)
        )

        this.timeoutId = setTimeout(() => {
          this._chainCreateGeneration()
        }, this.generation.expiration.getTime() - Date.now())
      })
      .catch(err => console.error(err))
  }
}

module.exports = Engine
