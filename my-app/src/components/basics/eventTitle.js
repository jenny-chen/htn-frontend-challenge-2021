import styled from 'styled-components';

const EventTitle = styled.h3`
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

export default EventTitle
