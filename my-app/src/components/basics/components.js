import styled, { css } from 'styled-components';

export const Text = styled.p`
  color: ${props => props.theme.colors.darkBlue};

  ${props => props.bold && css`
    font-weight: bold;
  `}
`

export const EventTypeText = styled(Text)`
  float: right;
  margin-top: 1.3em;

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

export const Title = styled.h1`
  font-size: 4em;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.darkBlue};
  float: left;
`

export const OutsideBox = styled.div`
  margin: 0% 15%;
`

export const InsideBox = styled.div`
  border: 2px solid ${props => props.theme.colors.darkBlue};
  border-radius: 10px;
  overflow: hidden;
`

export const Header = styled.header`
  position: sticky;
  background-color: ${props => props.theme.colors.offWhite};
  top: 0px;
  padding-top: 1vh;
  height: 8vh;
`

export const FilterInput = styled.input`
  padding: 6px;
  float: right;
  margin-top: 15px;
  border: 2px solid ${props => props.theme.colors.darkBlue};
  font-size: 1.1em;
`

export const EventBox = styled.div`
  border-top: ${props => props.first || "1px solid " + props.theme.colors.darkBlue};
  padding: 20px;
  scroll-margin-top: 8vh;

  &:hover {
    background-color: ${props => props.theme.colors.lightPink};
  }
`

export const Button = styled.a`
  padding: 10px;
  border: 2px solid ${props => props.theme.colors.darkBlue};
  border-radius: 10px;
  cursor: pointer;
  ${props => {
    switch (props.children) {
      case "Workshop":
        return `color: ${props.theme.colors.darkBeige};`
      case "Activity":
        return `color: ${props.theme.colors.tartOrange};`
      case "Tech Talk":
        return `color: ${props.theme.colors.teal};`
      default:
        return `color: ${props.theme.colors.darkBlue};`
    }
  }};

  &:hover {
    color: #143867;
  }
`

export const EventTitle = styled.h3`
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
  }}
`

export const DateHeader = styled.h2`
  float: left;
`
