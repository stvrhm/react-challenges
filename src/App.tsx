import * as React from "react";
import "./App.css";

function App() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [timer, setTimer] = React.useState({
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const timerFunction = setTimeout(function () {
      if (isRunning) {
        if (timer.seconds < 59) {
          setTimer({
            minutes: timer.minutes,
            seconds: timer.seconds + 1,
          });
        } else {
          setTimer({
            minutes: timer.minutes + 1,
            seconds: 0,
          });
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timerFunction);
    };
  }, [timer, isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };
  const stopTimer = () => {
    setIsRunning(false);
  };
  const resetTimer = () => {
    setTimer({
      minutes: 0,
      seconds: 0,
    });
  };
  return (
    <div className="container">
      <h1>Timer</h1>
      <span> {timer.minutes} mins </span>
      <span> {timer.seconds} secs</span>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
