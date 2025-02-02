// https://uk.react.dev/learn/rendering-lists
/* 
Часто потрібно показати кілька подібних компонентів із колекції даних.
Ви можете використовувати методи JavaScript для масивів, щоб маніпулювати масивом даних.
На цій сторінці ви використовуватиме filter() і map().

Припустимо, у вас є список певних даних.
<ul>
  <li>Кетрін Джонсон (Creola Katherine Johnson): математик</li>
  <li>Маріо Моліна (Mario José Molina-Pasquel Henríquez): хімік</li>
  <li>Абдус Салам (Moшинкаmad Abdus Salam): фізик</li>
  <li>Персі Джуліан (Percy Lavon Julian): хімік</li>
  <li>Субрахманьян Чандрасекар (Subrahmanyan Chandrasekhar): астрофізик</li>
</ul>

Ви можете відобразити ці дані за допомогою методу map().
const people = [
  'Кетрін Джонсон (Creola Katherine Johnson): математик',
  'Маріо Моліна (Mario José Molina-Pasquel Henríquez): хімік',
  'Абдус Салам (Moшинкаmad Abdus Salam): фізик',
  'Персі Джуліан (Percy Lavon Julian): хімік',
  'Субрахманьян Чандрасекар (Subrahmanyan Chandrasekhar): астрофізик'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}

*/

//Фільтрування елементів масиву 
/* 
const people = [{
  id: 0,
  name: 'Кетрін Джонсон (Creola Katherine Johnson)',
  profession: 'математик',
}, {
  id: 1,
  name: 'Маріо Моліна (Mario José Molina-Pasquel Henríquez)',
  profession: 'хімік',
}, {
  id: 2,
  name: 'Абдус Салам (Moшинкаmad Abdus Salam)',
  profession: 'фізик',
}, {
  id: 3,
  name: 'Персі Джуліан (Percy Lavon Julian)',
  profession: 'хімік',  
}, {
  id: 4,
  name: 'Субрахманьян Чандрасекар (Subrahmanyan Chandrasekhar)',
  profession: 'астрофізик',
}];

Скажімо ми хочемо вивести тільки хіміків
const chemists = people.filter(person =>
  person.profession === 'хімік'
);

const listItems = chemists.map(person =>
  <li>
     <img
       src={getImageUrl(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ', '}
       чиєю працею є {person.accomplishment}
     </p>
  </li>
);


Складніший приклад
//App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'хімік'
  );
  const listItems = chemists.map(person =>
    <li>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ', '}
        чиєю працею є {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}

// data.js
export const people = [{
  id: 0,
  name: 'Кетрін Джонсон (Creola Katherine Johnson)',
  profession: 'математик',
  accomplishment: 'розрахунки для космічних польотів',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Маріо Моліна (Mario José Molina-Pasquel Henríquez)',
  profession: 'хімік',
  accomplishment: 'відкриття озонової діри в Арктиці',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Абдус Салам (Moшинкаmad Abdus Salam)',
  profession: 'фізик',
  accomplishment: 'теорія електромагнетизму',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Персі Джуліан (Percy Lavon Julian)',
  profession: 'хімік',
  accomplishment: 'новаторські кортизоновмісні препарати, стероїди та протизаплідні таблетки',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Субрахманьян Чандрасекар (Subrahmanyan Chandrasekhar)',
  profession: 'астрофізик',
  accomplishment: 'розрахунок мас зір категорії "білий карлик"',
  imageId: 'lrWQx8l'
}];

//utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
*/
const people = [
  'Кетрін Джонсон (Creola Katherine Johnson): математик',
  'Маріо Моліна (Mario José Molina-Pasquel Henríquez): хімік',
  'Абдус Салам (Moшинкаmad Abdus Salam): фізик',
  'Персі Джуліан (Percy Lavon Julian): хімік',
  'Субрахманьян Чандрасекар (Subrahmanyan Chandrasekhar): астрофізик'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}

// Збереження порядку елементів списку за допомогою `key`
/* 
Ви повинні надати кожному елементу масиву key — стрічкову або числову змінну,
що унікально ідентифікує його серед інших елементів цього масиву:
//App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}</b>
          {' ' + person.profession + ', '}
          чиєю працею є {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}

// data.js
export const people = [{
  id: 0, // Used in JSX as a key
  name: 'Кетрін Джонсон (Creola Katherine Johnson)',
  profession: 'математик',
  accomplishment: 'розрахунки для космічних польотів',
  imageId: 'MK3eW3A'
}, {
  id: 1, // Used in JSX as a key
  name: 'Маріо Моліна (Mario José Molina-Pasquel Henríquez)',
  profession: 'хімік',
  accomplishment: 'відкриття озонової діри в Арктиці',
  imageId: 'mynHUSa'
}, {
  id: 2, // Used in JSX as a key
  name: 'Абдус Салам (Moшинкаmad Abdus Salam)',
  profession: 'фізик',
  accomplishment: 'теорія електромагнетизму',
  imageId: 'bE7W1ji'
}, {
  id: 3, // Used in JSX as a key
  name: 'Персі Джуліан (Percy Lavon Julian)',
  profession: 'хімік',
  accomplishment: 'новаторські кортизоновмісні препарати, стероїди та протизаплідні таблетки',
  imageId: 'IOjWm71'
}, {
  id: 4, // Used in JSX as a key
  name: 'Субрахманьян Чандрасекар (Subrahmanyan Chandrasekhar)',
  profession: 'астрофізик',
  accomplishment: 'розрахунок мас зір категорії "білий карлик"',
  imageId: 'lrWQx8l'
}];

//utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
*/
/* 
## Правила для ключів
- Ключі мають бути унікальними для елементів одного рівня. Проте можна використовувати однакові ключі для вузлів JSX у різних масивах.
- Ключі не повинні змінюватися, бо інакше це не відповідає їхньому призначенню! Не створюйте їх під час рендерингу.
*/

// challange
// 1. Розбиття одного списку на два
/*
Цей приклад показує список усіх людей.

Змініть його, щоб відобразити один за одним два окремі списки:
Хіміки та Усі інші. Як і раніше, ви можете визначити, чи є особа хіміком,
із порівняння person.profession === 'хімік'.

// App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ', '}
        чиєю працею є {person.accomplishment}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Науковці</h1>
      <ul>{listItems}</ul>
    </article>
  );
}

// data.js
export const people = [{
  id: 0,
  name: 'Кетрін Джонсон (Creola Katherine Johnson)',
  profession: 'математик',
  accomplishment: 'розрахунки для космічних польотів',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Маріо Моліна (Mario José Molina-Pasquel Henríquez)',
  profession: 'хімік',
  accomplishment: 'відкриття озонової діри в Арктиці',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Абдус Салам (Moшинкаmad Abdus Salam)',
  profession: 'фізик',
  accomplishment: 'теорія електромагнетизму',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Персі Джуліан (Percy Lavon Julian)',
  profession: 'хімік',
  accomplishment: 'новаторські кортизоновмісні препарати, стероїди та протизаплідні таблетки',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Субрахманьян Чандрасекар (Subrahmanyan Chandrasekhar)',
  profession: 'астрофізик',
  accomplishment: 'розрахунок мас зір категорії "білий карлик"',
  imageId: 'lrWQx8l'
}];

// utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
*/

// 2 Вкладені списки в одному компоненті
/*
Складіть список рецептів із цього масиву!
Для кожного рецепта в масиві відобразіть його назву як <h2> і перелічіть його інгредієнти в <ul>.

// App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Рецепти</h1>
    </div>
  );
}

// data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Грецький салат',
  ingredients: ['помідори', 'огірки', 'цибуля', 'оливки', 'фета']
}, {
  id: 'hawaiian-pizza',
  name: 'Гавайська піца',
  ingredients: ['тісто для піци', 'соус для піци', 'моцарела', 'шинка', 'ананас']
}, {
  id: 'hummus',
  name: 'Хумус',
  ingredients: ['нут', 'оливкова олія', 'зубчики часнику', 'лимон', 'тахіні']
}];
*/

// 3. Винесення компонента елемента списку
/*
Цей компонент RecipeList містить два вкладених виклики map.
Щоб спростити це, винесіть із нього компонент Recipe,
який матиме пропси id, name та ingredients.
Де і навіщо ви розмістите зовнішній `key`?
// App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Рецепти</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Грецький салат',
  ingredients: ['помідори', 'огірки', 'цибуля', 'оливки', 'фета']
}, {
  id: 'hawaiian-pizza',
  name: 'Гавайська піца',
  ingredients: ['тісто для піци', 'соус для піци', 'моцарела', 'шинка', 'ананас']
}, {
  id: 'hummus',
  name: 'Хумус',
  ingredients: ['нут', 'оливкова олія', 'зубчики часнику', 'лимон', 'тахіні']
}];
*/

// 4. Список із роздільником
/*
У цьому прикладі відображається відоме хайку (ред. — у вільному перекладі)
автора Тачібана Хокуші (Tachibana Hokushi),
кожен рядок якого обгорнуто тегом <p>.
Ваше завдання полягає в тому, щоб вставити роздільник <hr /> між кожним абзацом.
Ваша кінцева структура має виглядати так:
<article>
  <p>Пишу, стираю,</p>
  <hr />
  <p>Переписую знову —</p>
  <hr />
  <p>І ось мак зацвів.</p>
</article>

Хайку містить лише три рядки,
але ваше рішення має працювати з будь-якою кількістю рядків.
Зауважте, що елементи <hr /> з’являються лише між елементами <p>, а не на початку або в кінці!

// App.js
const poem = {
  lines: [
    'Пишу, стираю,',
    'Переписую знову —',
    'І ось мак зацвів.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, index) =>
        <p key={index}>
          {line}
        </p>
      )}
    </article>
  );
}
*/