function LastScreen({ score, maxScore }) {
  return (
    <p className="result">
      You scored {score} out of {maxScore} (
      {Math.ceil((score / maxScore) * 100)}%)
    </p>
  );
}

export default LastScreen;
