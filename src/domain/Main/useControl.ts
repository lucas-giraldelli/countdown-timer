import { useReducer, Dispatch } from 'react';

interface useControlProps {
  state: controlState;
  dispatch: Dispatch<controlAction>;
}

interface controlState {
  inputValue: string;
  timerSpeed: number;
  disabled: boolean;
  startTimer: boolean;
  error: boolean;
}

type controlAction =
  | { type: 'start' | 'restart' | 'error' }
  | { type: 'field'; fieldName: string; payload: string | number | boolean };

function controlReducer(
  state: controlState,
  action: controlAction,
): controlState {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'start': {
      return {
        ...state,
        error: false,
        disabled: true,
        startTimer: true,
      };
    }
    case 'restart': {
      return {
        ...state,
        timerSpeed: 1.0,
        disabled: false,
        startTimer: false,
        inputValue: '',
        error: false,
      };
    }
    case 'error': {
      return {
        ...state,
        error: true,
        inputValue: '',
      };
    }
    default:
      return state;
  }
}

const initialState: controlState = {
  inputValue: '',
  timerSpeed: 1.0,
  disabled: false,
  startTimer: false,
  error: false,
};

export const useControl = (): useControlProps => {
  const [state, dispatch] = useReducer(controlReducer, initialState);

  return { state, dispatch };
};
