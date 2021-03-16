import styled, { css } from 'styled-components'

const Box = styled.div`
  ${props => props.outside && css`
    margin: 0% 15% 10% 15%;
  `}

  ${props => props.inside && css`
    border: 2px solid ${props => props.theme.colors.darkBlue};
    border-radius: 10px;
    margin-bottom: 5%;
    overflow: hidden;
  `}

  ${props => props.top && css`
    height: 20vh;

    ${({ theme }) => `${theme.mediaQueries.tablet} {
      height: 15vh;
    }`}
  `}

  ${props => props.login && css`
    width: 100%;

    ${({ theme }) => `${theme.mediaQueries.tablet} {
      float: right;
      width: 25%;
      margin-top: 8%;
    }`}
  `}
`

export default Box
