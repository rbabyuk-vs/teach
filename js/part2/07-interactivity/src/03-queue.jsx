// https://uk.react.dev/learn/adding-interactivity#queueing-a-series-of-state-updates
import { useState } from 'react';

export default function Counter() {
  const [score, setScore] = useState(0);

  function increment() {
    setScore(score + 1);
  }

  return (
    <>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <h1>Загалом: {score}</h1>
    </>
  )
}
// Directly uses the current value of score and sets a new state (score + 1).
// However, React state updates are asynchronous. If multiple updates happen quickly (like multiple button clicks), score may not have the most recent value when setScore(score + 1) runs.

/*
import { useState } from 'react';

export default function Counter() {
  const [score, setScore] = useState(0);

  function increment() {
    setScore(s => s + 1);
  }

  return (
    <>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <h1>Загалом: {score}</h1>
    </>
  )
}

*/