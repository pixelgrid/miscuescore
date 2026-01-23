
import React from 'react';

import one from '../assets/balls/overview/one.png';
import two from '../assets/balls/overview/two.png';
import three from '../assets/balls/overview/three.png';
import four from '../assets/balls/overview/four.png';
import five from '../assets/balls/overview/five.png';
import six from '../assets/balls/overview/six.png';
import seven from '../assets/balls/overview/seven.png';
import eight from '../assets/balls/overview/eight.png';
import nine from '../assets/balls/overview/nine.png';
import ten from '../assets/balls/overview/ten.png';

export default function PottedBallsIndicator({ pottedBalls }) {
  return (
    <div className="potted-balls-indicator">
        <img className={pottedBalls.has("one") ? "potted" : ""} src={one} alt="1" />
        <img className={pottedBalls.has("two") ? "potted" : ""} src={two} alt="2" />
        <img className={pottedBalls.has("three") ? "potted" : ""} src={three} alt="3" />
        <img className={pottedBalls.has("four") ? "potted" : ""} src={four} alt="4" />
        <img className={pottedBalls.has("five") ? "potted" : ""} src={five} alt="5" />
        <img className={pottedBalls.has("six") ? "potted" : ""} src={six} alt="6" />
        <img className={pottedBalls.has("seven") ? "potted" : ""} src={seven} alt="7" />
        <img className={pottedBalls.has("eight") ? "potted" : ""} src={eight} alt="8" />
        <img className={pottedBalls.has("nine") ? "potted" : ""} src={nine} alt="9" />
    </div>
  );
}