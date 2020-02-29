import React from 'react'
import styled from '@emotion/styled'

const _FluidContainer = styled.div`
  width: 100%;
  padding: 0 15px;
`

const _Container = styled(_FluidContainer)`
  margin: 0 auto;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`

const Container = ({ children, ...otherProps }) => {
  if (otherProps.fluid)
    return <_FluidContainer {...otherProps}>{children}</_FluidContainer>
  return <_Container {...otherProps}>{children}</_Container>
}

export default Container
