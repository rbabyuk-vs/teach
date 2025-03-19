// https://uk.react.dev/learn/adding-interactivity#state-a-components-memory

import { useState } from 'react';
import { sculptureList } from './01-data.jsx';
import './App.css'

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const hasNext = index < sculptureList.length - 1;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Наступна
      </button>
      <h2>
        <i>{sculpture.name} </i>
        — {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} із {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Приховати' : 'Показати'} подробиці
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
    </>
  );
}
