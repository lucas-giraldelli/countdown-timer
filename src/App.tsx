import React from 'react';

import Main from './domain/Main';
import GlobalStyle from './styles/global';

import './styles/global.css';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Main />
    </>
  );
};

export default App;
