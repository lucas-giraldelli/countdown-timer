import React from 'react';

import Main from './domain/Main';
// for global css with styled-components
import GlobalStyle from './styles/global';

// for global css that don't work in styled (@font-face for seven segment)
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
