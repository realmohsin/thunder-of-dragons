import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import DragonAvatar from './DragonAvatar'
import Button from './Button'

const DragonCard = ({ dragon, inMarket }) => {
  // const { dragonName, dragonId, isPublic, saleValue } = dragon

  const [newName, setNewName] = useState()
  const [isPublic, setIsPublic] = useState()
  const [saleValue, setSaleValue] = useState()
  const [sireValue, setSireValue] = useState()
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    setNewName(dragon.dragonName)
  }, [dragon.dragonName])

  useEffect(() => {
    setIsPublic(dragon.isPublic)
  }, [dragon.isPublic])

  useEffect(() => {
    setSaleValue(dragon.saleValue)
  }, [dragon.saleValue])

  useEffect(() => {
    setSireValue(dragon.sireValue)
  }, [dragon.sireValue])

  const handleSave = async () => {
    const res = await fetch('http://localhost:3000/dragon/update', {
      method: 'PUT',
      body: JSON.stringify({
        dragonId: dragon.dragonId,
        dragonName: newName,
        isPublic,
        saleValue,
        sireValue
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const serverMsg = await res.json()
    if (serverMsg.type === 'error') {
      alert('Update Failed')
      setNewName(dragonName)
      setEditMode(false)
    } else {
      setEditMode(false)
    }
  }

  return (
    <div css={dragonCard}>
      {editMode ? (
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          css={inputName}
        />
      ) : (
        <h3>{newName}</h3>
      )}

      <DragonAvatar dragon={dragon} noId />

      <div css={storeInfo}>
        {editMode ? (
          <>
            <p>
              Gold Value:{' '}
              <input
                type='number'
                value={saleValue}
                onChange={e => setSaleValue(e.target.value)}
                css={saleValueInput}
              />
              <br />
              Sire Value:{' '}
              <input
                type='number'
                value={sireValue}
                onChange={e => setSireValue(e.target.value)}
                css={saleValueInput}
              />
            </p>
            <p>
              Public:{' '}
              <input
                type='checkbox'
                checked={isPublic}
                onChange={e => setIsPublic(e.target.checked)}
                css={checkboxInput}
              />
            </p>
          </>
        ) : (
          <>
            <p>
              Gold Value: {saleValue} <br /> Sire Value: {sireValue}
            </p>
            <p>Public: {isPublic ? 'True' : 'False'}</p>
          </>
        )}
      </div>
      {!inMarket &&
        (editMode ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={() => setEditMode(editMode => !editMode)}>
            Edit
          </Button>
        ))}
    </div>
  )
}

const dragonCard = css`
  padding-bottom: 20px;
`

const inputName = css`
  padding: 5px 10px;
  font-size: 28px;
  margin: 0 auto;
`

const storeInfo = css`
  display: grid;
  grid-template-columns: max-content max-content;
  justify-content: center;
  grid-column-gap: 300px;
  transform: translateY(-90%);
`

const saleValueInput = css`
  display: inline;
  transform: trans;
  padding: 3px;
  width: 60px;
`

const checkboxInput = css`
  display: inline;
  transform: scale(1.5) translateY(10%);
  cursor: pointer;
  transform-origin: left;
`

export default DragonCard
