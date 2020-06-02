import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  font-weight: bold;
  font-size: 1rem;
  color: white;
  background: var(--button-color);

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  padding: 0.75em 1.25em;
  border-radius: 0.25em;
  transition: background-color 0.5s;

  & + button {
    margin-left: 1em;
  }

  &:hover {
    background: ${darken(0.1, '#009FB7')};
  }
`;
