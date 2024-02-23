import { useQuestions } from "./hooks/useQuestions";
import Header from "./components/Header";
import Main from "./components/Main";
import Error from "./components/Error";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";

function App() {
  const { questions, status, index, selectedAnswer, score, dispatch } =
    useQuestions("http://localhost:8000/questions");
  const questionsLength = questions.length;
  const currentQuestion = questions.at(index);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsLength={questionsLength} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Question
              question={currentQuestion}
              index={index}
              dispatch={dispatch}
              answer={selectedAnswer}
            />
            <NextButton
              dispatch={dispatch}
              answer={selectedAnswer}
              index={index}
            />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
