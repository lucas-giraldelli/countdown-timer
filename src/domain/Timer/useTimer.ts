import { useState, useCallback } from 'react';

interface useTimerReturn {
  halfWayEnd: boolean;
  pause: boolean;
  resume: boolean;
  minutes: number;
  seconds: number;
  everySecondCB(): void;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  setPause: React.Dispatch<React.SetStateAction<boolean>>;
  setResume: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTimer = (timer: number): useTimerReturn => {
  const [halfWayEnd, setHalfWayEnd] = useState(false);
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
    if (odd && minutes === Math.floor(halfMinute) && seconds === 31) {
      setHalfWayEnd(true);
    }
  }, [minutes, seconds, timer]);

  const everySecondCB = useCallback(() => {
    // decreases one second if seconds > 0
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }

    // see if is on halfway;
    handleHalfWay();

    // if sec equal to 0 and minutes > 0 then keep doing the logic
    if (seconds === 0) {
      if (minutes > 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
      }
    }
  }, [handleHalfWay, minutes, seconds, setMinutes, setSeconds]);

  return {
    halfWayEnd,
    pause,
    resume,
    minutes,
    seconds,
    everySecondCB,
    setMinutes,
    setSeconds,
    setPause,
    setResume,
  };
};
