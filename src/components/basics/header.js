import styled, { css } from 'styled-components'

const Header = styled.header`
  position: sticky;
  background-color: ${props => props.theme.colors.offWhite};
  top: 0px;
  padding-top: 1vh;
  height: 8vh;
  width: 50%;

  ${props => props.filter && css`
    float: right;
  `}
`

export default Header
