import React, { useState } from 'react'
import { css } from '@emotion/core'
import DragonCard from './DragonCard'
import Button from './Button'
import SireOptions from './SireOptions'
import history from '../history'

const PublicDragon = ({ dragon, accountDragons }) => {
  const [open, setOpen] = useState(false)

  const buyDragon = async ({ dragonId, saleValue }) => {
    try {
      const res = await fetch('http://localhost:3000/dragon/buy', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dragonId, saleValue })
      })
      const dragonData = await res.json()
      alert(dragonData.message.toUpperCase())
      if (dragonData.type !== 'error') {
        history.push('/my-dragons')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <DragonCard dragon={dragon} inMarket />
      <Button
        onClick={() =>
          buyDragon({
            dragonId: dragon.dragonId,
            saleValue: dragon.saleValue
          })
        }
        css={buttonCss}
      >
        Buy
      </Button>
      <Button onClick={() => setOpen(open => !open)} css={buttonCss}>
        {open ? 'Close Options' : 'Sire'}
      </Button>
      {open && (
        <SireOptions
          dragons={accountDragons}
          patronDragonId={dragon.dragonId}
        />
      )}
    </>
  )
}

const buttonCss = css`
  transform: translateY(-100%);
  margin: 0 10px;
`

export default PublicDragon
