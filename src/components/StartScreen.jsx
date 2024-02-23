function StartScreen({ questionsLength, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{questionsLength} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "START_GAME" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
