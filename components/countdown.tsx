import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetTimestamp: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTimestamp }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function calculateTimeRemaining() {
    const now = Math.floor(Date.now() / 1000);
    const remainingSeconds = targetTimestamp - now;

    if (remainingSeconds <= 0) {
      // Handle when the countdown reaches or goes below zero
      // For example, you might want to display a message or take some action
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
    const seconds = remainingSeconds % 60;

    return { days, hours, minutes, seconds };
  }

  return (
    <div>
      <p>Countdown:</p>
      <p>{timeRemaining.days} days</p>
      <p>{timeRemaining.hours} hours</p>
      <p>{timeRemaining.minutes} minutes</p>
      <p>{timeRemaining.seconds} seconds</p>
    </div>
  );
};

export default CountdownTimer;
