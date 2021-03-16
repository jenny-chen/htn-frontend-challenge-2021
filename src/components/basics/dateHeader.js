import styled from 'styled-components';

const DateHeader = styled.h2`
  float: left;
  margin-bottom: 10px;
  font-size: 1.3em;

  ${({ theme }) => `${theme.mediaQueries.tablet} {
    font-size: 1.5em;
  }`}

`

export default DateHeader
