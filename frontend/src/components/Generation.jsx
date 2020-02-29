import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { fetchGeneration } from '../store/actions'

class Generation extends React.Component {
  timeout = null

  componentDidMount () {
    this.fetchNextGeneration()
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  fetchNextGeneration = async () => {
    await this.props.fetchGeneration()
    const delay =
      new Date(this.props.currentGeneration.expiration).getTime() - Date.now()
    this.timeout = setTimeout(() => {
      this.fetchNextGeneration()
    }, delay)
  }

  render () {
    const { currentGeneration, loading, error } = this.props
    if (error) {
      return <div>Error Getting Generation...</div>
    }
    return (
      <div>
        <h2>
          Generation Id: {currentGeneration && currentGeneration.generationId}
        </h2>
      </div>
    )
  }
}

export default connect(
  ({ generation: { currentGeneration, loading, error } }) => ({
    currentGeneration,
    loading,
    error
  }),
  { fetchGeneration }
)(Generation)
