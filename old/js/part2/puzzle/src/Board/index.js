import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardSquare from "../BoardSquare";
import Knight from "../Knight";

export default function Board({ knightPosition }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {Array.from({ length: 64 }, (_, i) => {
          const x = i % 8;
          const y = Math.floor(i / 8);
          const isKnightHere = knightPosition[0] === x && knightPosition[1] === y;
          
          return (
            <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
              <BoardSquare x={x} y={y}>
                {isKnightHere && <Knight />}
              </BoardSquare>
            </div>
          );
        })}
      </div>
    </DndProvider>
  );
}
