// https://uk.react.dev/learn/adding-interactivity#responding-to-events

import './App.css'

export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Відтворюється!')}
      onUploadImage={() => alert('Завантажується!')}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Відтворити фільм
      </Button>
      <Button onClick={onUploadImage}>
        Завантажити зображення
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
