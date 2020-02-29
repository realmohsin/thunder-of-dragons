import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import DragonAvatar from './DragonAvatar'
import { fetchDragon } from '../store/actions'
import Button from './Button'

const Dragon = ({ newDragon, loading, error, fetchDragon }) => {
  if (error) {
    return (
      <>
        <div>{error}</div>
        <Button onClick={fetchDragon}>New Dragon</Button>
      </>
    )
  }
  return (
    <div>
      {newDragon && <DragonAvatar dragon={newDragon} />}
      <Button onClick={fetchDragon}>New Dragon</Button>
    </div>
  )
}

// const buttonCss = css`
//   margin: 0 auto;
// `

export default connect(
  ({ dragon }) => ({
    newDragon: dragon.newDragon,
    loading: dragon.loading,
    error: dragon.error
  }),
  { fetchDragon }
)(Dragon)
