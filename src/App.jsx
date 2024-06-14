/** @format */

import { useEffect, useState, useRef } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import "./App.css";

function App() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Loading...");
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timerRef.current);
          setStatus("Complete");
          setTimeout(() => {
            setProgress(0);
            setStatus("Loading...");
            startTimer(); // Restart the timer
          }, 5000);
          return 100;
        }
        return prevProgress + 1; // Increment progress
      });
    }, 500); // Update every half second
  };

  useEffect(() => {
    startTimer();

    return () => clearInterval(timerRef.current); // Cleanup timer on component unmount
  }, []);

  useEffect(() => {
    // Calculate green shade based on progress
    const greenShade = Math.floor((progress / 100) * 255);
    document.body.style.backgroundColor = `rgb(${100 - progress}, ${greenShade}, ${progress})`;
  }, [progress]);

  return (
    <div className='container'>
      <ProgressBar
        completed={progress}
        customLabel={`${progress}%`}
        className='barrr'
        labelColor='#000000'
        baseBgColor='#00fff7'
        bgColor={`rgb(${255}, ${progress * 2}, ${55})`}
      />
      <div className='status'>
        <h2>{status}</h2>
      </div>
    </div>
  );
}

export default App;
