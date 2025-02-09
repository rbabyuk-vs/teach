import React from "react";

function Overlay({ color }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: color,
        opacity: 0.5,
        zIndex: 1,
      }}
    />
  );
}

export default Overlay;
