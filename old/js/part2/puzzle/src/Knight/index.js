import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../Constants";

function Knight() {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.KNIGHT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <span
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        fontSize: "3rem",
        fontWeight: "bold",
      }}
    >
      ♘
    </span>
  );
}

export default Knight;
