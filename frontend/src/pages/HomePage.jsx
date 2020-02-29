import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import Generation from '../components/Generation'
import Dragon from '../components/Dragon'
import AccountInfo from '../components/AccountInfo'
import { Redirect } from 'react-router-dom'

const HomePage = ({ isAuth }) => {
  if (!isAuth) {
    return <Redirect to='/signup' />
  }
  return (
    <div css={homePage}>
      <AccountInfo />
      <Generation />
      <Dragon />
    </div>
  )
}

const homePage = css`
  text-align: center;
  padding-top: 100px;
`

export default connect(({ account }) => ({ isAuth: account.isAuth }))(HomePage)
