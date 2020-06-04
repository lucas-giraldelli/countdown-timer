import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Main from '../domain/Main';
import Timer from '../domain/Timer';

Enzyme.configure({ adapter: new Adapter() });

const testOne =
  'Should be able to enter a # of minutes (positive integer) and click a “Start” button to initialize the countdown.';
const testTwo = 'Should see a timer in MM:SS format.';
const testThree =
  'Should be able to pause & resume the countdown using pause / resume buttons.';
const testFour = 'Should be able to speed up by: 1.5x';
const testFourDotFive = 'Should be able to speed up by: 2x.';
const testFive =
  'Should see, when half of the selected duration has been passed, a string of text above the countdown timer reading: “More than halfway there!” .';
const testSix =
  'Should see, starting at 20 seconds, the countdown timer turn into red.';
const testSeven = 'Should see, starting at 10 seconds, the text blinking.';
const testEight =
  'Should see, when timer reaches 0, the text changing to: “Time’s up!”.';

describe('Tests for the countdown timer', () => {
  it(testOne, async () => {
    const { getByTestId } = render(<Main />);
    const inputEl = (await waitFor(() =>
      getByTestId('inputEl'),
    )) as HTMLInputElement;

    const newMinute = '15';
    fireEvent.change(inputEl, {
      target: { value: newMinute },
    });
    expect(inputEl.value).toEqual(newMinute);

    const startButtonEl = (await waitFor(() =>
      getByTestId('startButtonEl'),
    )) as HTMLButtonElement;

    fireEvent.click(startButtonEl);

    expect(getByTestId('timerEl')).toBeTruthy();
  });

  it(testTwo, async () => {
    const { getByTestId, getByText } = render(<Main />);
    const inputEl = (await waitFor(() =>
      getByTestId('inputEl'),
    )) as HTMLInputElement;

    const newMinute = '15';
    fireEvent.change(inputEl, {
      target: { value: newMinute },
    });
    expect(inputEl.value).toEqual(newMinute);

    const startButtonEl = (await waitFor(() =>
      getByTestId('startButtonEl'),
    )) as HTMLButtonElement;

    fireEvent.click(startButtonEl);

    expect(getByTestId('timerEl')).toBeTruthy();

    expect(getByText('15:00')).toBeTruthy();
  });

  it(testThree, () => {
    act(() => {
      jest.useFakeTimers();
      const timerComponent = mount(<Timer timer={15} speed={1} />);
      expect(timerComponent.find('span').text()).toEqual('15:00');
      jest.advanceTimersByTime(1000);
      timerComponent.find('button').simulate('click'); // pause
      expect(timerComponent.find('span').text()).toEqual('14:59');
      timerComponent.find('button').simulate('click'); // resume
      jest.advanceTimersByTime(2000);
      expect(timerComponent.find('span').text()).toEqual('14:57');
    });
  });

  it(testFour, () => {
    act(() => {
      jest.useFakeTimers();
      const timerComponent = mount(<Timer timer={15} speed={1.5} />);
      expect(timerComponent.find('span').text()).toEqual('15:00');
      jest.advanceTimersByTime(4000);
      expect(timerComponent.find('span').text()).toEqual('14:55');
    });
  });

  it(testFourDotFive, () => {
    act(() => {
      jest.useFakeTimers();
      const timerComponent = mount(<Timer timer={15} speed={2} />);
      expect(timerComponent.find('span').text()).toEqual('15:00');
      jest.advanceTimersByTime(4000);
      expect(timerComponent.find('span').text()).toEqual('14:52');
    });
  });

  it(testFive, () => {
    act(() => {
      jest.useFakeTimers();
      const timerComponent = mount(<Timer timer={1} speed={1} />);
      expect(timerComponent.find('span').text()).toEqual('01:00');
      jest.advanceTimersByTime(31000);
      timerComponent.update();
      expect(timerComponent.find('p').text()).toEqual(
        'More than half way there!',
      );
    });
  });

  it(testSix, () => {
    act(() => {
      jest.useFakeTimers();
      const timerComponent = mount(<Timer timer={1} speed={1} />);
      expect(timerComponent.find('span').text()).toEqual('01:00');
      jest.advanceTimersByTime(40000);
      timerComponent.update();
      expect(timerComponent.find('.eXBGSE').text()).toEqual('00:20');
    });
  });

  it(testSeven, () => {
    act(() => {
      jest.useFakeTimers();
      const timerComponent = mount(<Timer timer={1} speed={1} />);
      expect(timerComponent.find('span').text()).toEqual('01:00');
      jest.advanceTimersByTime(50000);
      timerComponent.update();
      expect(timerComponent.find('.hsenyk').text()).toEqual('00:10');
    });
  });

  it(testEight, () => {
    act(() => {
      jest.useFakeTimers();
      const timerComponent = mount(<Timer timer={1} speed={1} />);
      expect(timerComponent.find('span').text()).toEqual('01:00');
      jest.advanceTimersByTime(60000);
      timerComponent.update();
      expect(timerComponent.find('p').text()).toEqual("Time's Up!");
    });
  });
});
