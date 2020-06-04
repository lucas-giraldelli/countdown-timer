import React, { useEffect, useState } from 'react';
import { FiPause, FiSkipForward } from 'react-icons/fi';
import { useTimer } from './useTimer';

import Button from '../../components/Button';

import { TimerContainer, TimerNumbers } from './styles';

interface TimerProps {
  timer: number;
  speed: number;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ timer, speed, className }) => {
  const [status, setStatus] = useState(true);
  const [redText, setRedText] = useState(false);
  const [blink, setBlink] = useState(false);

  const {
    halfWayEnd,
    pause,
    resume,
    minutes,
    seconds,
    setPause,
    setResume,
    everySecondCB,
  } = useTimer(timer);

  useEffect((): (() => void) => {
    // creates the loop based on minutes:seconds
    let everySecond = setInterval(() => everySecondCB(), 1000 / speed);

    // if minutes === 0
    // and seconds === 0 set red color
    // and seconds === 0 set red color
    if (minutes === 0) {
      if (seconds === 20) {
        setRedText(true);
      }
      if (seconds === 10) {
        setBlink(true);
      }
    }

    // if pause is set to true, then clear the interval
    if (pause) {
      clearInterval(everySecond);
    }

    // if resume is set to true, then pause is no more,
    // then restart the loop and resets resume variable, because no more resuming.
    if (resume) {
      setPause(false);
      everySecond = setInterval(() => everySecondCB(), 1000 / speed);
      setResume(false);
    }

    // if ends (sec && min equal to 0) then clear any effect plus interval
    if (seconds === 0 && minutes === 0) {
      setBlink(false);
      setRedText(false);
      setStatus(false);
      clearInterval(everySecond);
    }

    // clear the timeout to avoid memory leaks
    return function cleanup(): void {
      clearInterval(everySecond);
    };
  }, [
    everySecondCB,
    minutes,
    pause,
    resume,
    seconds,
    setPause,
    setResume,
    speed,
  ]);

  return (
    <TimerContainer data-testid="timerEl" className={className}>
      {halfWayEnd && (
        <p className="halfWayEnd">
          {status ? 'More than half way there!' : "Time's Up!"}
        </p>
      )}
      <TimerNumbers textColor={redText} blinking={blink} speed={speed}>
        {`${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}
      </TimerNumbers>
      <Button id="pauseResumeButton">
        {!pause ? (
          <FiPause size={45} onClick={() => setPause(true)} />
        ) : (
          <FiSkipForward size={45} onClick={() => setResume(true)} />
        )}
      </Button>
    </TimerContainer>
  );
};

export default Timer;
