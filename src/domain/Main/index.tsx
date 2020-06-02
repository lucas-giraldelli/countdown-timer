import React, { FormEvent, useState, useCallback } from 'react';
import { FiPlay, FiClock, FiRotateCcw } from 'react-icons/fi';
import ReactTooltip from 'react-tooltip';

import Timer from '../Timer';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Header, Main, SpeedButtons } from './styles';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [timerSpeed, setTimerSpeed] = useState(1.0);
  const [disabled, setDisabled] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [error, setError] = useState(false);

  const handleStartTimer = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
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
    },
    [inputValue],
  );

  const handleRestartTimer = useCallback((): void => {
    setTimerSpeed(1.0);
    setDisabled(false);
    setStartTimer(false);
    setInputValue('');
  }, []);

  const handleFormatValue = useCallback((inputNumber: string): number => {
    // remove leading zeros
    const formatedValue = inputNumber.replace(/^0+/g, '');
    return +formatedValue;
  }, []);

  const handlePassTimerSpeed = useCallback((speedValue: number): void => {
    setTimerSpeed(speedValue);
  }, []);

  return (
    <>
      <ReactTooltip place="bottom" effect="solid" />
      <Header>
        <FiClock className="logo" size={155} color="#FED766" />
        <h1>Countdown Timer</h1>
        <form onSubmit={handleStartTimer}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Please type a number"
            disabled={disabled}
          />
          <Button data-tip="Start" type="submit">
            <FiPlay size={35} />
          </Button>
          <Button data-tip="Reset" onClick={() => handleRestartTimer()}>
            <FiRotateCcw size={35} />
          </Button>
        </form>
        {error && (
          <span className="errorStyle">
            Please insert a number in MM or M and higher than 0.
          </span>
        )}
      </Header>
      <Main>
        {startTimer ? (
          <Timer
            className="timer"
            timer={handleFormatValue(inputValue)}
            speed={timerSpeed}
          />
        ) : (
          <span>00:00</span>
        )}
      </Main>
      <SpeedButtons>
        <Button
          data-tip="Increase speed"
          onClick={() => handlePassTimerSpeed(1.0)}
        >
          1.0x
        </Button>
        <Button
          data-tip="Increase speed"
          onClick={() => handlePassTimerSpeed(1.5)}
        >
          1.5x
        </Button>
        <Button
          data-tip="Increase speed"
          onClick={() => handlePassTimerSpeed(2.0)}
        >
          2.0x
        </Button>
      </SpeedButtons>
    </>
  );
};

export default App;
