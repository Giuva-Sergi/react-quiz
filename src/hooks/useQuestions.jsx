import { useReducer, useEffect } from "react";

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  index: null,
  selectedAnswer: null,
  score: 0,
  highScore: 0,
  secondsLeft: 300,
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
    case "END_GAME":
      return {
        ...state,
        status: "finished",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };
    case "RESTART_GAME":
      return {
        ...state,
        status: "active",
        index: 0,
        score: 0,
        selectedAnswer: null,
        secondsLeft: 10,
      };
    case "COUNTING":
      return {
        ...state,
        secondsLeft: state.secondsLeft - 1,
        status: state.secondsLeft === 0 ? "finished" : state.status,
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };
    default:
      throw new Error("Action is unknown");
  }
}

function useQuestions(url) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    selectedAnswer,
    score,
    highScore,
    secondsLeft,
  } = state;

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

  return {
    questions,
    status,
    index,
    selectedAnswer,
    score,
    highScore,
    secondsLeft,
    dispatch,
  };
}

export { useQuestions };
