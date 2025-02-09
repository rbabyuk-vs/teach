import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableImage = ({ id, src, isDropped }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={src}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        width: '100px',
        margin: '10px',
        filter: isDropped ? 'grayscale(100%)' : 'none',
      }}
      alt="draggable"
    />
  );
};

const TargetArea = ({ targetId, onDrop, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'image',
    drop: (item) => onDrop(item.id, targetId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        position: 'absolute',
        border: isOver ? '2px dashed red' : '2px dashed gray',
        borderRadius: '10px',
        width: '100px',
        height: '100px',
        ...getTargetPosition(targetId),
      }}
    >
      {children}
    </div>
  );
};

const getTargetPosition = (targetId) => {
  // Adjust these positions based on your main.jpg layout
  const positions = {
    1: { left: '30%', top: '30%' },
    2: { left: '30%', top: '50%' },
    3: { left: '30%', top: '70%' },
  };
  return positions[targetId] || {};
};

const Game = () => {
  const [droppedItems, setDroppedItems] = React.useState({});

  const handleDrop = (draggedId, targetId) => {
    setDroppedItems(prev => ({ ...prev, [targetId]: draggedId }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ textAlign: 'center' }}>
        <h1>Розмістіть правильно елементи</h1>
        
        <div style={{ position: 'relative', margin: '20px auto', width: 'fit-content' }}>
          <img 
            src="/images/main.jpg" 
            alt="main" 
            style={{ width: '200px', borderRadius: '10px' }} 
          />
          
          {[1, 2, 3].map((targetId) => (
            <TargetArea key={targetId} targetId={targetId} onDrop={handleDrop}>
              {droppedItems[targetId] && (
                <img
                  src={`/images/${droppedItems[targetId]}.jpg`}
                  alt="dropped"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </TargetArea>
          ))}
        </div>

        <div>
          {[1, 2, 3].map((id) => (
            <DraggableImage
              key={id}
              id={id}
              src={`/images/${id}.jpg`}
              isDropped={Object.values(droppedItems).includes(id.toString())}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Game;