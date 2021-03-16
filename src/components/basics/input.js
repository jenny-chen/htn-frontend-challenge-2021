import styled, { css } from 'styled-components';

const Input = styled.input`
  border: 1px solid ${props => props.theme.colors.darkBlue};
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1.1em;
  padding: 6px;
  width: 100%;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  ${props => props.button && css`
    background-color: ${props => props.theme.colors.lightPink};
    font-weight: bold;
    margin-top: 5%;

    &:hover {
      background-color: ${props => props.theme.colors.darkerLightPink};
    }
  `}

  ${props => props.cancel && css`
    background-color: ${props => props.theme.colors.lightestGray};

    &:hover {
      background-color: ${props => props.theme.colors.lightGray};
    }
  `}

  ${props => props.filter && css`
    border: 2px solid ${props => props.theme.colors.darkBlue};
    margin-top: 15px;
    font-size: 1em;

    ${({ theme }) => `${theme.mediaQueries.tablet} {
      float: right;
      font-size: 1.1em;
      width: 60%;
    }`}

  `}
`

export default Input
