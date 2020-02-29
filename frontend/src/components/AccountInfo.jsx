import React, { useEffect } from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { fetchAccountInfo } from '../store/actions'

const AccountInfo = ({ accountInfo, fetchAccountInfo }) => {
  useEffect(() => {
    fetchAccountInfo()
  }, [])
  return (
    <div>
      <h3>Username: {accountInfo.username}</h3>
      <h4>Gold: {accountInfo.balance}</h4>
    </div>
  )
}

export default connect(
  ({ accountInfo }) => ({ accountInfo: accountInfo.accountInfo }),
  {
    fetchAccountInfo
  }
)(AccountInfo)
