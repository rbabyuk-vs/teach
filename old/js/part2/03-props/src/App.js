// https://uk.react.dev/learn/passing-props-to-a-component

// Пропси — це інформація, яку ви передаєте до тегу JSX.
// Наприклад, className, src, alt, width та height — деякі з пропсів,
// які ви можете передати до тегу <img>:

function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Лін Ланьїн (Lin Lanying)"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}

// Передача пропсів до компонента
// немає пропсів
/* export default function Profile() {
  return (
    <Avatar />
  );
} */

// передаємо пропси
// example 1
/* 
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Лін Ланьїн (Lin Lanying)', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}

// full example
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{ 
          name: 'Кацуко Сарухаші (Katsuko Saruhashi)', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Аклілу Лемма (Aklilu Lemma)', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size={50}
        person={{ 
          name: 'Лін Ланьїн (Lin Lanying)',
          imageId: '1bX5QH6'
        }}
      />
    </div>
  );
}

*/

// Вказання значення за замовчуванням для пропа 
/* function Avatar({ person, size = 100 }) {
  // ...
} */

// Передача пропсів за допомогою spread синтаксису JSX 
/* function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
  
-->>
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
Використовуйте синтаксис spread з обережністю.
Якщо ви використовуєте його в кожному іншому компоненті, то щось пішло не так.
Часто це свідчить про те, що вам слід розбити ваші компоненти та передати дочірні елементи як JSX. 
Детальніше про це далі!
*/

// Передача JSX як children
/* 
з тегами можна так
<div>
  <img />
</div>

і з компонентами також так
<Card>
  <Avatar />
</Card>

// App.js
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Кацуко Сарухаші (Katsuko Saruhashi)',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}

// Avatar.js
import { getImageUrl } from './utils.js';

export default function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

// utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
*/

// Як пропси змінюються з часом 
/* 
// Clock.js
export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}
*/

// challanges
// Винесіть компонент 

/*
Цей компонент Gallery містить дуже схожу розмітку для двох профілів.
Винесіть компонент Profile з нього, щоб зменшити дублювання.
Вам потрібно буде вибрати, які пропси передати йому.

// App.js
import { getImageUrl } from './utils.js';

export default function Gallery() {
  return (
    <div>
      <h1>Визначні вчені</h1>
      <section className="profile">
        <h2>Марія Склодовська-Кюрі (Maria Skłodowska-Curie)</h2>
        <img
          className="avatar"
          src={getImageUrl('szV5sdG')}
          alt="Марія Склодовська-Кюрі (Maria Skłodowska-Curie)"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Професія: </b> 
            фізик та хімік
          </li>
          <li>
            <b>Нагороди: 4 </b> 
            (Нобелівська премія з фізики, Нобелівська премія з хімії, Медаль Дейві, Медаль Маттеуччі)
          </li>
          <li>
            <b>Відкрито: </b>
            полоній (хімічний елемент)
          </li>
        </ul>
      </section>
      <section className="profile">
        <h2>Кацуко Сарухаші (Katsuko Saruhashi)</h2>
        <img
          className="avatar"
          src={getImageUrl('YfeOqp2')}
          alt="Кацуко Сарухаші (Katsuko Saruhashi)"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Професія: </b> 
            геохімік
          </li>
          <li>
            <b>Нагороди: 2 </b> 
            (Премія Міяке з геохімії, Премія Танака)
          </li>
          <li>
            <b>Відкрито: </b>
            метод вимірювання вмісту діоксиду карбону в морській воді
          </li>
        </ul>
      </section>
    </div>
  );
}

// utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}

// 2 Налаштування розміру зображення на основі пропу 
У цьому прикладі компонент Avatar отримує числовий проп size,
який визначає ширину та висоту елемента <img>.
Для пропу size задано значення 40. Однак,
якщо ви відкриєте зображення в новій вкладці, ви помітите,
що саме зображення є більшим (160 пікселів).
Справжній розмір зображення визначається розміром ескізу, який ви запитуєте.

Змініть компонент Avatar, щоб він запитував найближчий розмір зображення на основі пропу size.
Зокрема, якщо size менше 90, передайте 's'
(від англ. «small» — малий) замість 'b' (від англ. «big» — великий) у функцію getImageUrl.
Переконайтеся, що ваші зміни працюють,
виконуючи рендер аватарів з різними значеннями пропу size та відкриваючи зображення в новій вкладці.
// App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person, 'b')}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <Avatar
      size={40}
      person={{ 
        name: 'Грегоріо І. Зара (Gregorio Y. Zara)', 
        imageId: '7vQD0fP'
      }}
    />
  );
}

// utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}


// 3 Передача JSX у проп children
Винесіть компонент Card з розмітки нижче та використайте проп children, щоб передати йому різний JSX:
export default function Profile() {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <h1>Фото</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/OKS67lhm.jpg"
            alt="Аклілу Лемма (Aklilu Lemma)"
            width={70}
            height={70}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h1>Про</h1>
          <p>Аклілу Лемма (Aklilu Lemma) був видатним ефіопським вченим, який відкрив природний спосіб лікування шистосомозу.</p>
        </div>
      </div>
    </div>
  );
}
*/