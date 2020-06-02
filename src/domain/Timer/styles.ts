import styled, { css } from 'styled-components';

interface TimerNumbersProps {
  textColor: boolean;
  blinking: boolean;
  speed: number;
}

export const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p.halfWayEnd {
    font-size: 1.5rem;
    color: var(--bg-contrast-error-color);
  }

  button {
    width: 4rem;
    height: 4rem;
    padding: 0.15rem;
    border-radius: 50%;
  }
`;

export const TimerNumbers = styled.span<TimerNumbersProps>`
  ${(props) =>
    props.textColor &&
    css`
      color: var(--red-contrast-error-twenty);
    `}

  ${(props) =>
    props.blinking &&
    css`
      animation: blink ${1 / props.speed}s linear infinite;
    `}

  @keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
