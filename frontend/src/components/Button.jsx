import styled from '@emotion/styled'

const Button = styled.button`
  cursor: pointer;
  font: inherit;
  user-select: none;
  padding: 0.375em 0.75em;
  border-radius: 0.25em;
  line-height: 1.5;
  transition: all 0.15s ease-in-out;
  color: white;
  background: ${props => props.color || '#666'};
  border: 1px solid ${props => props.color || '#666'};
  /* regular vs block  */
  display: ${props => (props.block ? 'block' : 'inline-block')};
  width: ${props => (props.block ? '100%' : 'auto')};
  ${props => !props.block && 'vertical-align: middle'};
  /* for link element version */
  text-decoration: none;
  &:hover {
    background: ${props => props.hoverColor || '#444'};
    border: 1px solid ${props => props.hoverColor || '#444'};
  }
  &:focus {
    outline: none;
  }
`
export default Button
