import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg.logo {
    padding: 1em;
  }

  h1 {
    color: #fed766;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      width: 55%;
      margin-right: 0.45rem;
    }

    button {
      width: 15%;
      padding: 0.4rem;
      border-radius: 0.45em;

      & + button {
        margin-left: 0.45rem;
      }
    }
  }

  span.errorStyle {
    font-size: 1.5rem;
    color: var(--red-contrast-error-twenty);

    padding: 0.5rem;
  }
`;

export const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;

  span {
    font-family: 'SevenSegment';
    font-size: 10rem;
    padding: 0 1rem 1rem;
  }
`;

export const SpeedButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    font-size: 1.2rem;
  }
`;
