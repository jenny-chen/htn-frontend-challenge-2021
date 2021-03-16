import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Theme from './components/basics/theme.js'
import GlobalStyle from './components/basics/globalStyle.js'

ReactDOM.render(
  <Theme>
    <GlobalStyle />
    <App />
  </Theme>,
  document.getElementById('root')
);

