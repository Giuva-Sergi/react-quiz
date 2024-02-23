import { useTimer } from "../hooks/useTimer";

function Timer({ dispatch, secondsLeft }) {
  const { minutes, seconds } = useTimer(dispatch, secondsLeft);
  return (
    <div className="timer">
      {minutes < 10 ? `0${minutes}` : `${minutes}`}:
      {seconds < 10 ? `0${seconds}` : `${seconds}`}
    </div>
  );
}

export default Timer;
