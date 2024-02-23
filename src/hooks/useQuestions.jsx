import { useReducer, useEffect } from "react";

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  index: null,
  selectedAnswer: null,
  score: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "DATA_RECEIVED":
      return { ...state, questions: action.payload, status: "ready" };
    case "FAILED_TO_FETCH":
      return { ...state, status: "error" };
    case "START_GAME":
      return { ...state, status: "active", index: 0 };
    case "SELECTED_ANSWER":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        selectedAnswer: action.payload,
        score:
          currentQuestion.correctOption === action.payload
            ? state.score + currentQuestion.points
            : state.score,
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        index:
          action.payload >= state.questions.length
            ? state.questions.length - 1
            : action.payload,
        selectedAnswer: null,
      };
    default:
      throw new Error("Action is unknown");
  }
}

function useQuestions(url) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, selectedAnswer, score } = state;

  useEffect(() => {
    const fetchData = async function () {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch questions. Status: ${res.status}`);
        }
        const data = await res.json();
        dispatch({
          type: "DATA_RECEIVED",
          payload: data,
        });
      } catch (error) {
        dispatch({ type: "FAILED_TO_FETCH" });
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return { questions, status, index, selectedAnswer, score, dispatch };
}

export { useQuestions };