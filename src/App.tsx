import React, { useEffect, useState } from 'react';
import './App.css';

function generateExpression(target: number): string {
  const operators = ['+', '-', '*'];
  for (let i = 0; i < 1000; i++) {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const c = Math.floor(Math.random() * 10);
    for (const op1 of operators) {
      for (const op2 of operators) {
        const expr = `${a}${op1}${b}${op2}${c}`;
        try {
          if (eval(expr) === target) return expr;
        } catch {}
      }
    }
  }
  return target.toString();
}

function App() {
  const [hourExpr, setHourExpr] = useState('');
  const [minuteExpr, setMinuteExpr] = useState('');
  const [displayFullscreen, setDisplayFullscreen] = useState(true);
  const [seconds, setSeconds] = useState(new Date().getSeconds());

  const updateTime = () => {
    const now = new Date();
    setHourExpr(generateExpression(now.getHours()));
    setMinuteExpr(generateExpression(now.getMinutes()));
  };

  useEffect(() => {
    updateTime();

    //const minuteInterval = setInterval(updateTime, 60000);
    //return () => clearInterval(minuteInterval);
  }, []);

  useEffect(() => {
    const secondInterval = setInterval(() => {
      const localSeconds =  new Date().getSeconds();
      setSeconds(localSeconds);
      if (localSeconds == 0){
          updateTime();
      }
    }, 1000);
    return () => clearInterval(secondInterval);
  }, []);

  return (
    <div className="App">
    {displayFullscreen ?
        <button className="fullscreen-button" onClick={() => {
          const elem = document.documentElement;
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if ((elem as any).webkitRequestFullscreen) { // Safari
            (elem as any).webkitRequestFullscreen();
          } else if ((elem as any).msRequestFullscreen) { // IE11
            (elem as any).msRequestFullscreen();
          }
            setDisplayFullscreen(false);
        }}>
          Vollbild
        </button>
        : <></>
    }

      <div className="time-line">{hourExpr} h</div>
      <div className="time-line">{minuteExpr} m</div>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${(seconds / 60) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default App;
