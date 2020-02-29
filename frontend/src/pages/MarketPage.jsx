import React, { useEffect } from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { fetchPublicDragons, fetchAccountDragons } from '../store/actions'
import PublicDragon from '../components/PublicDragon'

const MarketPage = ({
  publicDragons,
  accountDragons,
  fetchPublicDragons,
  fetchAccountDragons
}) => {
  useEffect(() => {
    fetchPublicDragons()
    fetchAccountDragons()
  }, [])

  return (
    <div css={marketPage}>
      {publicDragons &&
        publicDragons.map(dragon => (
          <div key={dragon.dragonId} css={cardContainer}>
            <PublicDragon dragon={dragon} accountDragons={accountDragons} />
            <hr />
          </div>
        ))}
    </div>
  )
}

const marketPage = css`
  padding-top: 100px;
  text-align: center;
`

const cardContainer = css`
  &:not(:first-of-type) {
    padding-top: 25px;
  }
  text-align: center;
`

export default connect(
  ({ publicDragons, accountDragons }) => ({
    publicDragons: publicDragons.publicDragons,
    accountDragons: accountDragons.dragons
  }),
  { fetchPublicDragons, fetchAccountDragons }
)(MarketPage)
