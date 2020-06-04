import React, { useCallback } from 'react';
import { FiPlay, FiClock, FiRotateCcw } from 'react-icons/fi';
import ReactTooltip from 'react-tooltip';
import { useControl } from './useControl';

import Timer from '../Timer';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Header, Main, SpeedButtons } from './styles';

const App: React.FC = () => {
  const { state, dispatch } = useControl();
  const { inputValue, timerSpeed, disabled, startTimer, error } = state;

  const handleStartTimer = useCallback((): void => {
    const isNumber = inputValue.match(/^\d{1,2}$/);

    const onlyZeros = inputValue.match(/^0{1,2}$/);

    if (!isNumber || onlyZeros) {
      dispatch({ type: 'error' });
    } else {
      dispatch({ type: 'start' });
    }
  }, [dispatch, inputValue]);

  const handleFormatValue = useCallback((inputNumber: string): number => {
    // remove any leading zeros
    const formatedValue = inputNumber.replace(/^0+/g, '');

    // and give back the string transformed in number
    return +formatedValue;
  }, []);

  return (
    <>
      {/** Component for rendering the tooltips */}
      <ReactTooltip place="bottom" effect="solid" />
      <Header>
        <FiClock className="logo" size={155} color="#FED766" />
        <h1>Countdown Timer</h1>
        <form>
          {/** Component for getting user input */}
          <Input
            value={inputValue}
            onChange={(e) =>
              dispatch({
                type: 'field',
                fieldName: 'inputValue',
                payload: e.target.value,
              })
            }
            placeholder="Please type a minute"
            disabled={disabled}
          />

          {/** Component for starting the timer */}
          <Button
            data-testid="startButtonEl"
            data-tip="Start"
            onClick={() => handleStartTimer()}
          >
            <FiPlay size={35} />
          </Button>

          {/** Component for restarting the timer */}
          <Button
            data-tip="Reset"
            onClick={() => dispatch({ type: 'restart' })}
          >
            <FiRotateCcw size={35} />
          </Button>
        </form>
        {/** Error html that will be rendered with input is invalid */}
        {error && (
          <span className="errorStyle">
            Please insert a number in MM or M and higher than 0.
          </span>
        )}
      </Header>
      <Main>
        {/** Component for the timer itself */}
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

      {/** Each speed button the timer */}
      <SpeedButtons>
        <Button
          data-tip="Increase speed by 1.0"
          onClick={() =>
            dispatch({
              type: 'field',
              fieldName: 'timerSpeed',
              payload: 1.0,
            })
          }
        >
          1.0x
        </Button>
        <Button
          data-tip="Increase speed by 1.5"
          onClick={() =>
            dispatch({
              type: 'field',
              fieldName: 'timerSpeed',
              payload: 1.5,
            })
          }
        >
          1.5x
        </Button>
        <Button
          data-tip="Increase speed by 2.0"
          onClick={() =>
            dispatch({
              type: 'field',
              fieldName: 'timerSpeed',
              payload: 2.0,
            })
          }
        >
          2.0x
        </Button>
      </SpeedButtons>
    </>
  );
};

export default App;
