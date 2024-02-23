function NextButton({ dispatch, answer, index, questionsLength }) {
  if (index === questionsLength - 1 && answer !== null) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "END_GAME" })}
      >
        FINISH
      </button>
    );
  }
  return (
    answer !== null && (
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "NEXT_QUESTION",
            payload: index + 1,
          })
        }
      >
        NEXT
      </button>
    )
  );
}

export default NextButton;
