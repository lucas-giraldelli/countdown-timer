import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    /**CSS vars */
    --bg-color: #696773;
    --font-color: #eff1f3;
    --button-color: #009FB7;
    --bg-contrast-error-color: #7FBB8F;
    --red-contrast-error-twenty: #870909;

    /**Font reinforcement */
    font-size: 16px;
    font-weight: 400;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: var(--bg-color);
    color: var(--font-color);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, span, p {
    font-family: 'Roboto Slab', serif;
  }

  button {
    cursor: pointer;
  }
`;
