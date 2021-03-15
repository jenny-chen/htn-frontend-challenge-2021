import styled from 'styled-components';

const DateHeader = styled.h2`
  float: left;
  margin-bottom: 10px;

  ${({ theme }) => `${theme.mediaQueries.tablet} {
  }`}

`

export default DateHeader
