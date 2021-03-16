import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

  a {
    text-decoration: none;
    cursor: pointer;
  }

  body {
    background-color: #FFF5EB;
    padding: 0;
    margin: 0;
    font-family: Inter, sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }
`;

export default GlobalStyle
