import styled, { css } from 'styled-components'

const Anchor = styled.a`
  color: ${props => props.theme.colors.darkBlue};

  &:hover {
    color: ${props => props.theme.colors.blue};
    text-decoration: underline;
  }
`

export default Anchor
