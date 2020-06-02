import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  label {
    font-size: 1.5rem;
    font-weight: 700;

    display: flex;
    flex-direction: column;

    input {
      font-size: 1.5rem;
      font-weight: 700;
      text-align: center;
      color: var(--bg-color);

      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 0.45em;

      &::placeholder {
        font-size: 1.2rem;
      }
    }
  }
`;
