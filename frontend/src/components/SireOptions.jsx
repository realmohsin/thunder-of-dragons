import React from 'react'
import { css } from '@emotion/core'
import DragonAvatar from './DragonAvatar'
import history from '../history'

const SireOptions = ({ dragons, patronDragonId }) => {
  const mate = async ({ patronDragonId, matronDragonId }) => {
    try {
      const res = await fetch('http://localhost:3000/dragon/mate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ patronDragonId, matronDragonId }),
        credentials: 'include'
      })

      const serverMsg = await res.json()
      if (serverMsg.type === 'error') {
        alert(serverMsg.message)
        history.push('/public-dragons')
      } else {
        alert(serverMsg.message)
        history.push('/my-dragons')
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div css={sireOptions}>
      {dragons.map(dragon => (
        <div
          css={sireOption}
          onClick={() =>
            mate({ patronDragonId, matronDragonId: dragon.dragonId })
          }
        >
          <DragonAvatar dragon={dragon} key={dragon.dragonId} noId />
        </div>
      ))}
    </div>
  )
}

const sireOptions = css`
  margin-top: -50px;
  display: flex;
  justify-content: center;
`

const sireOption = css`
  transform: scale(0.5);
  cursor: pointer;
`

export default SireOptions
