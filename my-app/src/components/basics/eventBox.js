import styled from 'styled-components'

const EventBox = styled.div`
  border-top: ${props => props.first || "1px solid " + props.theme.colors.darkBlue};
  padding: 20px;
  scroll-margin-top: 8vh;

  &:hover {
    background-color: ${props => props.theme.colors.lightPink};
  }
`

export default EventBox
