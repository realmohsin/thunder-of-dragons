import React, { useEffect } from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import DragonCard from '../components/DragonCard'
import { fetchAccountDragons } from '../store/actions'

const MyDragonsPage = ({ dragons, fetchAccountDragons }) => {
  useEffect(() => {
    fetchAccountDragons()
  }, [])
  return (
    <div css={myDragonsPage}>
      {dragons &&
        dragons.map(dragon => (
          <div key={dragon.dragonId} css={cardContainer}>
            <DragonCard dragon={dragon} />
            <hr />
          </div>
        ))}
    </div>
  )
}

const myDragonsPage = css`
  padding-top: 100px;
  text-align: center;
`

const cardContainer = css`
  &:not(:first-child) {
    margin-top: 30px;
  }
`

export default connect(
  ({ accountDragons }) => ({
    dragons: accountDragons.dragons
  }),
  { fetchAccountDragons }
)(MyDragonsPage)
