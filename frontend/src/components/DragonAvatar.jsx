import React, { useState } from 'react'
import { css } from '@emotion/core'
import {
  skinny,
  slender,
  sporty,
  stocky,
  patchy,
  plain,
  spotted,
  striped
} from '../assets'
import Button from './Button'

const propertyMap = {
  backgroundColor: {
    black: '#263238',
    white: '#cfd8dc',
    green: '#a5d6a7',
    blue: '#0277bd'
  },
  build: { slender, stocky, sporty, skinny },
  pattern: { plain, striped, spotted, patchy },
  size: { small: 100, medium: 140, large: 180, enormous: 220 }
}

const DragonAvatar = ({ dragon, noId }) => {
  const { dragonId } = dragon

  const createDragonImage = () => {
    const traitMap = {}

    dragon.traits.forEach(({ traitType, traitValue }) => {
      traitMap[traitType] = propertyMap[traitType][traitValue]
    })

    const sizing = { width: traitMap.size, height: traitMap.size }

    return (
      <div css={imageWrapper}>
        <div
          css={bgDiv}
          style={{
            backgroundColor: traitMap.backgroundColor,
            ...sizing
          }}
        ></div>
        <img
          css={pattern}
          style={{ ...sizing }}
          src={traitMap.pattern}
          alt=''
        />
        <img css={outline} style={{ ...sizing }} src={traitMap.build} alt='' />
      </div>
    )
  }

  return (
    <div css={dragonAvatar}>
      {!noId && <h2>Dragon Id: {dragonId}</h2>}
      <p>
        Dragon Traits: {dragon.traits.map(trait => trait.traitValue).join(', ')}
      </p>
      {createDragonImage()}
    </div>
  )
}

const dragonAvatar = css`
  margin-bottom: 10px;
`

const imageWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

const bgDiv = css`
  position: absolute;
`

const pattern = css`
  position: absolute;
`

const outline = css`
  z-index: 0;
`

export default DragonAvatar
