function LastScreen({ score, maxScore, highScore, dispatch }) {
  const percentage = Math.ceil((score / maxScore) * 100);

  let emoji;

  if (percentage === 100) {
    emoji = "🥇";
  } else if (percentage >= 80 && percentage < 100) {
    emoji = "🎉";
  } else if (percentage >= 50 && percentage < 80) {
    emoji = "😁";
  } else if (percentage > 0 && percentage < 50) {
    emoji = "🤔";
  } else {
    emoji = "🤦‍♂️";
  }

  return (
    <>
      <p className="result">
        {emoji} You scored {score} out of {maxScore} ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "RESTART_GAME" })}
      >
        RESTART
      </button>
    </>
  );
}

export default LastScreen;
