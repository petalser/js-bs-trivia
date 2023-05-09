import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard';


function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(10, 'easy');

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e) => {
    if (!gameOver) {
      //answer
      const answer = e.currentTarget.value;
      //check answer
      const correct = questions[number].correct_answer === answer;
      //...and increment score if right
      if (correct) {setScore(prev => prev + 1)};
      //set score array
      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, AnswerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === 10) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <>
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === 10 ?
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p>Loading questions...</p>}
      {!loading && !gameOver && (
      <QuestionCard
        questionNr={number + 1}
        totalQuestions={10}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== 10 - 1 ? (
        <button className='next' onClick={nextQuestion}>
        Next Question
      </button>
      ) : null}
    </>
  );
}

export default App;
