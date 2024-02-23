function Progressbar({ index, questionsLength, score, maxScore, answer }) {
  console.log(answer);
  return (
    <section className="progress">
      <progress
        max={questionsLength}
        value={answer !== null ? index + 1 : index}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {questionsLength}
      </p>
      <p>
        <strong>{score}</strong> / {maxScore}
      </p>
    </section>
  );
}

export default Progressbar;
