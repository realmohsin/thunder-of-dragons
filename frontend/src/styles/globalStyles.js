import { css } from '@emotion/core'
import { colors, fontFamilies, breakpoints } from './variables'

const globalStyles = css`
  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    @media (max-width: ${breakpoints.landscape}) {
      font-size: 60%;
    }
    @media (max-width: ${breakpoints.portrait}) {
      font-size: 58%;
    }
  }

  body {
    font-family: ${fontFamilies.textFont};
    font-size: 1.6rem;
    line-height: 1.7;
    font-weight: 400;
    color: black;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${fontFamilies.titleFont};
    font-weight: 400;
  }

  h1 {
    font-size: 4.6rem;
  }

  h2 {
    font-size: 3.8rem;
  }

  h3 {
    font-size: 2.8rem;
  }

  h4 {
    font-size: 2.2rem;
  }

  h5 {
    font-size: 2rem;
  }

  h6 {
    font-size: 1.8rem;
  }

  ol,
  ul {
    list-style: none;
  }

  ::selection {
    background-color: ${colors.primary || 'black'};
    color: white;
  }

  a,
  img,
  label,
  input,
  select,
  button {
    display: block;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  *.active {
    color: darkgreen;
    font-weight: bold;
    text-decoration: underline;
  }
`

export default globalStyles
