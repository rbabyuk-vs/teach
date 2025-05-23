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
// to fix replace `setScore(score + 1)` на `setScore(s => s + 1)`