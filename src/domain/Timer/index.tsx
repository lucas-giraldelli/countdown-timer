import React, { useState, useEffect, useCallback } from 'react';
import { FiPause, FiSkipForward } from 'react-icons/fi';

import Button from '../../components/Button';

import { TimerContainer, TimerNumbers } from './styles';

interface TimerProps {
  timer: number;
  speed: number;
  className: string;
}

const Timer: React.FC<TimerProps> = ({ timer, speed, className }) => {
  const [halfWayEnd, setHalfWayEnd] = useState(false);
  const [status, setStatus] = useState(true);

  const [redText, setRedText] = useState(false);
  const [blink, setBlink] = useState(false);

  const [minutes, setMinutes] = useState(timer);
  const [seconds, setSeconds] = useState(0);

  const [pause, setPause] = useState(false);
  const [resume, setResume] = useState(false);

  const handleHalfWay = useCallback(() => {
    // if number / 2 === float number it means that is odd
    const halfMinute = timer / 2;
    const odd = halfMinute.toString().match(/^\d{1,2}\.\d/);

    // if the number is even
    if (!odd && minutes === halfMinute && seconds === 0) {
      setHalfWayEnd(true);
    }

    // if the number is odd
    if (odd && minutes === Math.floor(halfMinute) && seconds === 30) {
      setHalfWayEnd(true);
    }
  }, [minutes, seconds, timer]);

  const everySecondCB = useCallback(() => {
    // decreases one second if seconds > 0
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }

    // if sec equal to 0 and minutes > 0 then keep doing the logic
    if (seconds === 0) {
      if (minutes > 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
      }
    }
  }, [minutes, seconds]);

  useEffect((): (() => void) => {
    // creates the loop based on minutes:seconds
    let everySecond = setInterval(() => everySecondCB(), 1000 / speed);

    // see if is on halfway;
    handleHalfWay();

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
      setStatus(false);
      setBlink(false);
      setRedText(false);
      clearInterval(everySecond);
    }

    // clear the timeout to avoid memory leaks
    return function cleanup(): void {
      clearInterval(everySecond);
    };
  }, [everySecondCB, handleHalfWay, minutes, pause, resume, seconds, speed]);

  return (
    <TimerContainer className={className}>
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
      <Button>
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
