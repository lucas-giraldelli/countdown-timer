import { useState, useCallback, useReducer, Dispatch } from 'react';

interface useTimerReturn {
  minutes: number;
  seconds: number;
  state: timerState;
  dispatch: Dispatch<timerAction>;
  everySecondCB(): void;
}

interface timerState {
  status: boolean;
  redText: boolean;
  blink: boolean;
  pause: boolean;
  resume: boolean;
  halfWayEnd: boolean;
}

type timerAction = {
  type:
    | 'middle'
    | 'red_text'
    | 'blink'
    | 'pause'
    | 'resume'
    | 'clear_pause'
    | 'clear_resume'
    | 'end';
};

function timerReducer(state: timerState, action: timerAction): timerState {
  switch (action.type) {
    case 'pause':
      return {
        ...state,
        pause: true,
      };
    case 'resume':
      return {
        ...state,
        resume: true,
      };
    case 'middle':
      return {
        ...state,
        halfWayEnd: true,
      };
    case 'red_text':
      return {
        ...state,
        redText: true,
      };
    case 'blink':
      return {
        ...state,
        blink: true,
      };
    case 'clear_pause':
      return {
        ...state,
        pause: false,
      };
    case 'clear_resume':
      return {
        ...state,
        resume: false,
      };
    case 'end':
      return {
        ...state,
        blink: false,
        redText: false,
        status: false,
      };
    default:
      return state;
  }
}

const initialState: timerState = {
  status: true,
  redText: false,
  blink: false,
  pause: false,
  resume: false,
  halfWayEnd: false,
};

export const useTimer = (timer: number): useTimerReturn => {
  const [minutes, setMinutes] = useState(timer);
  const [seconds, setSeconds] = useState(0);

  const [state, dispatch] = useReducer(timerReducer, initialState);

  const handleHalfWay = useCallback(() => {
    // if number / 2 === float number it means that is odd
    const halfMinute = timer / 2;
    const odd = halfMinute.toString().match(/^\d{1,2}\.\d/);

    // if the number is even
    if (!odd && minutes === halfMinute && seconds === 1) {
      dispatch({ type: 'middle' });
    }

    // if the number is odd
    if (odd && minutes === Math.floor(halfMinute) && seconds === 31) {
      dispatch({ type: 'middle' });
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
  }, [handleHalfWay, minutes, seconds]);

  return { state, dispatch, minutes, seconds, everySecondCB };
};
