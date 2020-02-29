import React, { useState } from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from '../components/Button'
import { login } from '../store/actions'

const LoginPage = ({ isAuth, loading, error, login }) => {
  if (isAuth) {
    return <Redirect to='/' />
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    login(username, password)
  }

  return (
    <div css={loginPage}>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
          Username:
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor='password'>
          Password:
          <input
            type='text'
            name='password'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <Button disabled={loading}>Login</Button>
      </form>
      <div css={errorCss}>{error}</div>
    </div>
  )
}

const loginPage = css`
  padding-top: 100px;
  text-align: center;
  & h1 {
    margin-bottom: 30px;
  }
  & input {
    display: inline-block;
    margin: 10px;
  }
  & button {
    margin-top: 20px;
  }
`

const errorCss = css`
  color: red;
  margin: 20px auto;
  text-align: center;
`

export default connect(
  ({ account }) => ({
    isAuth: account.isAuth,
    loading: account.loading,
    error: account.error
  }),
  { login }
)(LoginPage)
