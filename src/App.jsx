import { useQuestions } from "./hooks/useQuestions";
import Header from "./components/Header";
import Main from "./components/Main";
import Error from "./components/Error";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progressbar from "./components/Progressbar";
import LastScreen from "./components/LastScreen";

function App() {
  const { questions, status, index, selectedAnswer, score, dispatch } =
    useQuestions("http://localhost:8000/questions");
  const questionsLength = questions.length;
  const currentQuestion = questions.at(index);
  const maxScore = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

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
            <Progressbar
              index={index}
              questionsLength={questionsLength}
              score={score}
              maxScore={maxScore}
              answer={selectedAnswer}
            />
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
              questionsLength={questionsLength}
            />
          </>
        )}
        {status === "finished" && (
          <LastScreen score={score} maxScore={maxScore} />
        )}
      </Main>
    </div>
  );
}

export default App;
