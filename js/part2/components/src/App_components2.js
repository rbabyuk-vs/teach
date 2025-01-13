import logo from './logo.svg';
import './App.css';

// https://uk.react.dev/learn/importing-and-exporting-components
// сила компонентів React полягає тому, що їх можна перевикористовувати,
// таким чином, вони дозволяють вам створювати більш складні інтерфейси.
// тобто най веб додаток стає модульним

// загальна рекомендація це створювати один компонент на файл

// Файл кореневого компонента
// У Ваш перший компонент , ви створили компонент Profile та компонент Gallery, який його відображає:
/* 
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Кетерін Джонсон (Katherine Johnson)"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Видатні вчені</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
*/
// Ці компоненти зараз знаходяться у файлі кореневого компонента з назвою App.js у цьому прикладі.
// Залежно від вашої конфігурації ваш кореневий компонент може бути в іншому файлі.

// Експорт та імпорт компонента 
// Що, якщо ви захочете змінити стартовий екран у майбутньому і розмістити там список наукових книг? 
// 1. Створіть новий JS файл, щоб помістити компоненти в нього.
// 2. Експортуйте ваш функціональний компонент з цього файлу (використовуючи або дефолтний або іменований експорти).
// 3. Імпортуйте його в файл, де ви будете використовувати цей компонент (використовуючи відповідну техніку імпорту для дефолтного або іменованого експортів).
// Обидва компоненти Profile та Gallery були перенесені з App.js в новий файл під назвою Gallery.js. Тепер ви можете змінити App.js, щоб імпортувати Gallery з Gallery.js:
/* 
// App.js
import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}

// Gallery.js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Алан Л. Гарт (Alan L. Hart)"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Видатні вчені</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
*/


// Експорт та імпорт кількох компонентів з одного файлу 
// Що, якщо ви хочете показати лише один компонент Profile, а не галерею?
// Ви можете експортувати компонент Profile також. Але в Gallery.js вже є дефолтний експорт,
// і не можна мати два дефолтних експорти. Ви можете створити новий файл з дефолтним експортом
// або додати іменований експорт для Profile. 
// *Файл може мати тільки один дефолтний експорт, але може мати безліч іменованих експортів!*

// початку, експортуйте Profile з Gallery.js
/* export function Profile() {
  // ...
} */
// Потім, імпортуйте Profile з Gallery.js в App.js, використовуючи іменований імпорт (з фігурними дужками):
// import { Profile } from './Gallery.js';
// Нарешті, відрендеріть компонент <Profile /> з компоненту App:
/* export default function App() {
  return <Profile />;
} */
/* 
// App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <Profile />
  );
}

// Gallery.js
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Алан Л. Гарт (Alan L. Hart)"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Видатні вчені</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
*/
function App() {
  return (
    <>
    <h1>Hello, dude!</h1>
    </>
  );
}

export default App;
// challenge
// Розбити компоненти на менші частини 
/* 
араз Gallery.js експортує як Profile, так і Gallery, що дещо заплутує розуміння.

Перенесіть компонент Profile у окремий файл Profile.js, а потім змініть компонент App так, щоб він рендерив <Profile /> та <Gallery /> один за іншим.

Ви можете використовувати як дефолтний, так і іменований експорт для Profile, проте переконайтеся, що використовуєте відповідний синтаксис імпорту як в App.js, так і в Gallery.js! Ви можете скористатися таблицею з розділу про поглиблений аналіз вище:

| Синтаксис   | Вираз експорту                      | Вираз імпорту                         |
|-------------|-------------------------------------|---------------------------------------|
| Дефолтний   | export default function Button() {} | import Button from './Button.js';     |
| Іменований  | export function Button() {}         | import { Button } from './Button.js'; |

// App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <div>
      <Profile />
    </div>
  );
}

// Gallery.js
// Перенесіть мене у Profile.js!
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Алан Л. Гарт (Alan L. Hart)"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Видатні вчені</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

// Profile.js

напишіть код тут
*/
