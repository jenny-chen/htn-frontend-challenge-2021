import styled from 'styled-components';

const Title = styled.h1`
  color: ${props => props.theme.colors.darkBlue};
  float: left;
  font-size: 2.5em;
  margin-bottom: 15px;
  margin-top: 6vh;

  ${({ theme }) => `${theme.mediaQueries.tablet} {
    font-size: 4em;
  }`}

`

export default Title
