## Countdown Timer React

[![Netlify Status](https://api.netlify.com/api/v1/badges/367f5a71-27fb-4ac5-ba66-4966e8c1e96b/deploy-status)](https://countdown-timer-react.netlify.app/)

&nbsp;&nbsp;A Countdown timer made with React.

&nbsp;&nbsp;An application used to never forget the time of taking medicine (in minutes).

## Problem
&nbsp;&nbsp;Build a countdown timer SPA using React JS or React Native with controls to add time, speed up
/ slow down the countdown, pause, and resume.

## Requirements
*The user should be able to enter a # of minutes (positive integer) and click a “Start”
button to initialize the countdown.<br/>
*Timer format: MM:SS<br/>
*The user should be able to pause & resume the countdown using pause / resume
buttons.<br/>
*While the countdown timer is active, the user should be able to speed up / slow down
the speed at the following rates:<br/>
&nbsp;&nbsp;*1.0X (normal speed, selected by default)<br/>
&nbsp;&nbsp;*1.5X<br/>
&nbsp;&nbsp;*2X<br/>
*When half of the selected duration has been passed, display a string of text above the
countdown timer reading: “More than halfway there!”<br/>
*When the countdown timer reaches 0, this text should change to: “Time’s up!”<br/>
*When the countdown is within 20 seconds of ending, the countdown timer text should
turn red.<br/>
*At 10 seconds, the text should start blinking.<br/>
*Functionality should be appropriately divided into well-defined components.<br/>
*The look of the countdown timer should have a production-ready clean/modern
aesthetic. Creatively stylize the elements as you see fit.<br/>

## Project Screen Shots

![ Main Screen ](/assets/images/countdown_timer.png)

## Project Running

![ Usability ](/assets/images/countdown_timer.gif)

&nbsp;&nbsp;When the timer ends, just click on restart.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` or `yarn` installed globally on your machine.

Installation:

`npm install`
or
`yarn`

To Run Test Suite:

`npm test`
or
`yarn test`

![ Tests Screenshot ](/assets/images/countdown_timer_tests.png)

To Start Server:

`npm start`
or
`yarn start`

To Visit App:

`localhost:3000`
