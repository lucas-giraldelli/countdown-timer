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
    setInputValue(value);
  }, []);

  const handleStartTimer = useCallback((): void => {
    // check if input value (MM/M) is a valid number
    const isNumber = inputValue.match(/^\d{1,2}$/);
    // check if input value is higher than 0
    const onlyZeros = inputValue.match(/^0{1,2}$/);
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
    setTimerSpeed(1.0);
    setDisabled(false);
    setStartTimer(false);
    setInputValue('');
    setError(false);
  }, []);

  const handleFormatValue = useCallback((inputNumber: string): number => {
    // remove leading zeros
    const formatedValue = inputNumber.replace(/^0+/g, '');
    return +formatedValue;
  }, []);

  const handlePassTimerSpeed = useCallback((speedValue: number): void => {
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
