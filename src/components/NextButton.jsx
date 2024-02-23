function NextButton({ dispatch, answer, index }) {
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
