import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/core'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import throttle from 'lodash/throttle'
import CSSTransition from 'react-transition-group/CSSTransition'
import Container from './Container'
import Button from './Button'
import { logout } from '../store/actions'

// potential isAuthenticated prop for conditional rendering throughout

const Toggle = ({ onToggle }) => {
  return (
    <div css={toggleCss} onClick={onToggle}>
      <div />
      <div />
      <div />
    </div>
  )
}

const SideDrawer = ({ isAuthenticated, showing, closeSideDrawer }) => {
  return (
    <>
      <CSSTransition in={showing} unmountOnExit classNames='fade' timeout={600}>
        <div css={backdropCss} onClick={closeSideDrawer} />
      </CSSTransition>

      <div css={sideDrawerCss} className={showing && 'showing'}>
        <div>Thunder of Dragons</div>
        {/* SideDrawer Items Go Here */}
        <div>NavItems</div>
      </div>
    </>
  )
}
const NavBar = ({ isAuth, logout }) => {
  const [showingSideDrawer, setShowingSideDrawer] = useState(false)
  const navElement = useRef(null)
  useEffect(() => {
    let lastScrollPosition = window.pageYOffset
    const handleWindowScroll = () => {
      let currentScrollPosition = window.pageYOffset
      if (currentScrollPosition > lastScrollPosition) {
        navElement.current.classList.add('move-up-nav')
      } else {
        navElement.current.classList.remove('move-up-nav')
      }
      lastScrollPosition = currentScrollPosition
    }
    window.addEventListener('scroll', throttle(handleWindowScroll, 100))
  }, [])
  const handleToggle = () => {
    setShowingSideDrawer(showingSideDrawer => !showingSideDrawer)
  }
  const closeSideDrawer = () => setShowingSideDrawer(false)
  return (
    <>
      <nav ref={navElement} css={navBarCss}>
        <Container as='div' css={containerCss}>
          <Toggle onToggle={handleToggle} />
          <div css={logoCss}>
            {/* Logo or Left Side Nav Items Go Here */}
            Thunder of Dragons
          </div>
          <ul css={rightNavItemsCss}>
            {isAuth ? (
              <>
                <li>
                  <NavLink
                    to='/'
                    exact
                    css={css`
                      margin-top: 5px;
                    `}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/my-dragons'
                    css={css`
                      margin-top: 5px;
                    `}
                  >
                    My Dragons
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/public-dragons'
                    css={css`
                      margin-top: 5px;
                    `}
                  >
                    Dragon Market
                  </NavLink>
                </li>
                <li>
                  <Button onClick={logout}>Log Out</Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to='/signup'>Sign Up</NavLink>
                </li>
                <li>
                  <NavLink to='/login'>Log In</NavLink>
                </li>
              </>
            )}
          </ul>
        </Container>
      </nav>
      <SideDrawer
        showing={showingSideDrawer}
        closeSideDrawer={closeSideDrawer}
      />
    </>
  )
}
const toggleCss = css`
  width: 40px;
  height: 46px;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  cursor: pointer;
  & > div {
    width: 95%;
    height: 2px;
    background-color: white;
    transition: transform 0.2s;
  }
  &:hover > div:first-of-type {
    transform: translateY(-2px);
  }
  &:hover > div:last-of-type {
    transform: translateY(2px);
  }
  @media (min-width: 576px) {
    display: none;
  }
`
const backdropCss = css`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 0.6s;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: all 600ms;
  }
`
const sideDrawerCss = css`
  position: fixed;
  width: 280px;
  max-width: 65%;
  height: 100%;
  left: 0%;
  top: 0%;
  background-color: teal;
  box-shadow: 3px 0px 10px 2px rgba(0, 0, 0, 0.4);
  transition: transform 0.6s ease-in-out;
  transform: translateX(-104%);
  &.showing {
    transform: translateX(0);
  }
  ${'' /* @media (min-width: 576px) {
    display: none;
  } */}
`
const navBarCss = css`
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  color: black;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.4s;
  &.move-up-nav {
    transform: translateY(-110%);
  }
`
const containerCss = css`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const rightNavItemsCss = css`
  display: flex;
  & > li {
    padding: 0 15px;
    list-style: none;
  }
  @media (max-width: 576px) {
    display: none;
  }
`

const logoCss = css`
  color: darkgreen;
  font-size: 1.2em;
  font-family: 'Arial';
  font-style: italic;
`

export default connect(({ account }) => ({ isAuth: account.isAuth }), {
  logout
})(NavBar)
