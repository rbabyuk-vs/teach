import React, { useState, useEffect } from "react";
import Board from "./Board";
import { observe } from "./Game";

function App() {
  const [knightPosition, setKnightPosition] = useState([0, 0]);

  useEffect(() => {
    const unsubscribe = observe(setKnightPosition); // Attach observer

    return () => {
      unsubscribe(); // Cleanup observer when component unmounts
    };
  }, []);

  return (
    <div style={{ width: "400px", height: "400px", border: "2px solid black" }}>
      <Board knightPosition={knightPosition} />
    </div>
  );
}

export default App;
