function Options({ question, dispatch, answer }) {
  return (
    <ul className="options">
      {question.options.map((option, index) => (
        <li key={option}>
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              (answer !== null &&
                (index === question.correctOption ? "correct" : "wrong")) ||
              ""
            }`}
            disabled={answer !== null}
            onClick={() =>
              dispatch({ type: "SELECTED_ANSWER", payload: index })
            }
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Options;

// THIS GOES TO THE NEXT BUTTON
// onClick={() =>
//     dispatch({
//       type: "NEXT_QUESTION",
//       payload: index + 1,
//     })}
