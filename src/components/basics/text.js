import styled, { css } from 'styled-components';

const Text = styled.p`
  color: ${props => props.theme.colors.darkBlue};

  ${props => props.bold && css`
    font-weight: bold;
  `}

  ${props => props.error && css`
    color: red;
  `}

  ${props => props.type && css`
    float: right;
    margin-top: 1.3em;
  `}

  ${props => {
    switch (props.type) {
      case "workshop":
        return `color: ${props.theme.colors.darkBeige};`
      case "activity":
        return `color: ${props.theme.colors.tartOrange};`
      case "tech_talk":
        return `color: ${props.theme.colors.teal};`
      default:
        return `color: ${props.theme.colors.darkBlue};`
    }
  }};
`

export default Text
