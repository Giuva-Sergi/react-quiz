import { useEffect } from "react";

function useTimer(func, secondsLeft) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  useEffect(() => {
    setInterval(() => {
      func({ type: "COUNTING" });
    }, 1000);
  }, [func]);

  return { minutes, seconds };
}

export { useTimer };
