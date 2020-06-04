import { useState, useCallback } from 'react';

interface useInputReturn {
  inputValue: string;
  timerSpeed: number;
  disabled: boolean;
  startTimer: boolean;
  error: boolean;
  handleInputValue(value: string): void;
  handleStartTimer(): void;
  handleRestartTimer(): void;
  handleFormatValue(inputNumber: string): number;
  handlePassTimerSpeed(speedValue: number): void;
}

export const useControl = (): useInputReturn => {
  const [inputValue, setInputValue] = useState('');
  const [timerSpeed, setTimerSpeed] = useState(1.0);
  const [disabled, setDisabled] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [error, setError] = useState(false);

  const handleInputValue = useCallback((value: string): void => {
    // just set the state(inputValue) to the value from input
    setInputValue(value);
  }, []);

  const handleStartTimer = useCallback((): void => {
    // check if input value (MM/M) is valid
    const isNumber = inputValue.match(/^\d{1,2}$/);

    // check if input value is higher than 0
    const onlyZeros = inputValue.match(/^0{1,2}$/);

    // if NaN or only zeros, then throw error and clear input
    if (!isNumber || onlyZeros) {
      setError(true);
      setInputValue('');
    } else {
      setError(false);
      setDisabled(true);
      setStartTimer(true);
    }
  }, [inputValue]);

  const handleRestartTimer = useCallback((): void => {
    // just restarts everything
    setTimerSpeed(1.0);
    setDisabled(false);
    setStartTimer(false);
    setInputValue('');
    setError(false);
  }, []);

  const handleFormatValue = useCallback((inputNumber: string): number => {
    // remove any leading zeros
    const formatedValue = inputNumber.replace(/^0+/g, '');

    // and give back the string transformed in number
    return +formatedValue;
  }, []);

  const handlePassTimerSpeed = useCallback((speedValue: number): void => {
    // just set the state(timerSpeed) to the value from input
    setTimerSpeed(speedValue);
  }, []);

  return {
    inputValue,
    timerSpeed,
    disabled,
    startTimer,
    error,
    handleInputValue,
    handleStartTimer,
    handleRestartTimer,
    handleFormatValue,
    handlePassTimerSpeed,
  };
};
