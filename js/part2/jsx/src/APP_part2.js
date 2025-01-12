import logo from './logo.svg';
import './App.css';

// https://uk.react.dev/learn/javascript-in-jsx-with-curly-braces

// JavaScript у JSX з фігурними дужками
// Використовуйте фігурні дужки, щоб вставити JavaScript у JSX

// Передача стрічок з лапками 
/*
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Грегоріо І. Зара (Gregorio Y. Zara)"
    />
  );
}

vs.

export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Грегоріо І. Зара (Gregorio Y. Zara)';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
*/

// Використання фігурних дужок: Вікно до світу JavaScript 
// ім’я для вченого, name, а потім вбудовується з фігурними дужками всередині тегу <h1>:
/*
export default function TodoList() {
  const name = 'Грегоріо І. Зара (Gregorio Y. Zara)';
  return (
    <h1>Список справ {name}</h1>
  );
}
*/

// Будь-який вираз JavaScript працюватиме всередині фігурних дужок, включаючи виклики функцій, наприклад formatDate():
/*
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'uk-UA',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>Список справ на {formatDate(today)}</h1>
  );
}
*/

// Використання фігурних дужок для виразів JavaScript
/*
Де використовувати фігурні дужки 
Фігурні дужки можна використовувати в JSX двома способами:

Як текст безпосередньо всередині тегу JSX: <h1>Список справ {name}</h1> працює, але <{tag}>Список справ Грегоріо І. Зара (Gregorio Y. Zara)</{tag}> - ні.
Як атрибути безпосередньо після знаку =: src={avatar} прочитає змінну avatar, але src="{avatar}" передасть рядок "{avatar}".
*/

// CSS
/*
Використання “подвійних фігурних дужок”: CSS та інші об’єкти в JSX
ім рядків, чисел та інших виразів JavaScript, ви навіть можете передавати об’єкти в JSX.
Об’єкти також позначаються фігурними дужками, наприклад { name: "Геді Ламар (Hedy Lamarr)", inventions: 5 }.
Отже, щоб передати JS об’єкт в JSX, ви повинні обгорнути його в іншу пару фігурних дужок: person={{ name: "Геді Ламар (Hedy Lamarr)", inventions: 5 }}.

export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Покращити відеотелефон</li>
      <li>Підготувати лекції з авіаційних технологій</li>
      <li>Працювати над двигуном на спиртовому паливі</li>
    </ul>
  );
}

or

<ul style={
  {
    backgroundColor: 'black',
    color: 'pink'
  }
}>
*/

// NOTE!
// Вбудовані властивості style записуються в camelCase.
// Наприклад, HTML <ul style="background-color: black"> буде записано як <ul style={{ backgroundColor: 'black' }}> в вашому компоненті.


// Більше розваг з об’єктами JavaScript та фігурними дужками 
/*
const person = {
  name: 'Грегоріо І. Зара (Gregorio Y. Zara)',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Задачі {person.name}</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Грегоріо І. Зара (Gregorio Y. Zara)"
      />
      <ul>
        <li>Покращити відеотелефон</li>
        <li>Підготувати лекції з авіаційних технологій</li>
        <li>Працювати над двигуном на спиртовому паливі</li>
      </ul>
    </div>
  );
}
*/

function App() {
  return (
    <>
    hi there!
    </>
  );
}

export default App;

// challange
// 1. Виправте помилку 
// Цей код видає помилку Objects are not valid as a React child:
/*
const person = {
  name: 'Грегоріо І. Зара (Gregorio Y. Zara)',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Задачі {person}</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Грегоріо І. Зара (Gregorio Y. Zara)"
      />
      <ul>
        <li>Покращити відеотелефон</li>
        <li>Підготувати лекції з авіаційних технологій</li>
        <li>Працювати над двигуном на спиртовому паливі</li>
      </ul>
    </div>
  );
}
*/

// 2.Виділіть інформацію в об’єкт 
//
// Виділіть URL зображення в об’єкт person.
/*
const person = {
  name: 'Грегоріо І. Зара (Gregorio Y. Zara)',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Задачі {person.name}</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Грегоріо І. Зара (Gregorio Y. Zara)"
      />
      <ul>
        <li>Покращити відеотелефон</li>
        <li>Підготувати лекції з авіаційних технологій</li>
        <li>Працювати над двигуном на спиртовому паливі</li>
      </ul>
    </div>
  );
}
*/


// 3. Використання фігурних дужок для виразів JavaScript
// У наведеному нижче об’єкті повний URL зображення розбитий на чотири частини: базовий URL, imageId, imageSize, та розширення файлу.
// Ми хочемо, щоб URL зображення комбінував ці атрибути разом: базовий URL (завжди 'https://i.imgur.com/'), imageId ('7vQD0fP'), imageSize ('s'), та розширення файлу (завжди '.jpg'). Однак щось неправильно з вказанням src у теґу <img>.
// Чи можете ви це виправити?
/*

const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Грегоріо І. Зара (Gregorio Y. Zara)',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Задачі {person.name}</h1>
      <img
        className="avatar"
        src="{baseUrl}{person.imageId}{person.imageSize}.jpg"
        alt={person.name}
      />
      <ul>
        <li>Покращити відеотелефон</li>
        <li>Підготувати лекції з авіаційних технологій</li>
        <li>Працювати над двигуном на спиртовому паливі</li>
      </ul>
    </div>
  );
}
*/
