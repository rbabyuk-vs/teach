let knightPosition = [0, 0];
let observer = null;

function emitChange() {
  if (observer) {
    observer(knightPosition);
  }
}

export function observe(o) {
  observer = o;
  emitChange();

  return () => {
    observer = null; // Remove observer when unmounting
  };
}

export function moveKnight(toX, toY) {
  knightPosition = [toX, toY];
  emitChange();
}

export function canMoveKnight(toX, toY) {
  const [x, y] = knightPosition;
  const dx = toX - x;
  const dy = toY - y;

  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2);
}
