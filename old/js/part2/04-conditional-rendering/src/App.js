// https://uk.react.dev/learn/conditional-rendering
// Умовний рендеринг у JSX

/* 
Припустимо, у вас є компонент PackingList, який рендерить кілька компонентів Item, які можуть бути запаковані або ні:
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Список речей для пакування Саллі Райд(Sally Ride)</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Космічний костюм" 
        />
        <Item 
          isPacked={true} 
          name="Шолом із золотим листям" 
        />
        <Item 
          isPacked={false} 
          name="Фото Тем О'Шонессі(Tam O'Shaughnessy)" 
        />
      </ul>
    </section>
  );
}

if else


if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;


-->>
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✅</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Список речей для пакування Саллі Райд(Sally Ride)</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Космічний костюм" 
        />
        <Item 
          isPacked={true} 
          name="Шолом із золотим листям" 
        />
        <Item 
          isPacked={false} 
          name="Фото Тем О'Шонессі(Tam O'Shaughnessy)" 
        />
      </ul>
    </section>
  );
}

*/

// Умовне повернення нічого за допомогою null
/* 
У певних ситуаціях, ви не хотітимете рендерити взагалі будь-що.
Наприклад, скажімо, ви не хочете рендерити запаковані елементи взагалі.
Але компонент повинен повертати щось.
У цьому випадку ви можете повернути null:

if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;

-->>

unction Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Список речей для пакування Саллі Райд(Sally Ride)</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Космічний костюм" 
        />
        <Item 
          isPacked={true} 
          name="Шолом із золотим листям" 
        />
        <Item 
          isPacked={false} 
          name="Фото Тем О'Шонессі(Tam O'Shaughnessy)" 
        />
      </ul>
    </section>
  );
}

!!! Повернення null з компонента не є поширеною практикою
Часто використовується умвоне повернення значельнь, наприклад за допомогою If else або тернарного оператора.
*/

// if else -- Тернарний оператор
/*

if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;

-->>
return (
  <li className="item">
    {isPacked ? name + ' ✅' : name}
  </li>
);
*/

// тепер якщо ми хочемо позначити елементи як викреслані то можна діяти отак
/* 
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✅'}
        </del>
      ) : (
        name
      )}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Список речей для пакування Саллі Райд(Sally Ride)</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Космічний костюм" 
        />
        <Item 
          isPacked={true} 
          name="Шолом із золотим листям" 
        />
        <Item 
          isPacked={false} 
          name="Фото Тем О'Шонессі(Tam O'Shaughnessy)" 
        />
      </ul>
    </section>
  );
}

*/

//  оператор AND (&&)
/* 
return (
  <li className="item">
    {name} {isPacked && '✅'}
  </li>
)

-->>
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Список речей для пакування Саллі Райд(Sally Ride)</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Космічний костюм" 
        />
        <Item 
          isPacked={true} 
          name="Шолом із золотим листям" 
        />
        <Item 
          isPacked={false} 
          name="Фото Тем О'Шонессі(Tam O'Shaughnessy)" 
        />
      </ul>
    </section>
  );
}
*/

// Умовне присвоєння JSX змінній 
/* 
Коли скорочення заважають писати звичайний код,
спробуйте використати оператор if та змінну.
Ви можете переприсвоювати змінні, визначені за допомогою let,
тому почніть з задання вмісту за замовчуванням, який ви хочете відобразити, name:

let itemContent = name;
if (isPacked) {
  itemContent = name + " ✅";
}

-->>
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✅";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Список речей для пакування Саллі Райд(Sally Ride)</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Космічний костюм" 
        />
        <Item 
          isPacked={true} 
          name="Шолом із золотим листям" 
        />
        <Item 
          isPacked={false} 
          name="Фото Тем О'Шонессі(Tam O'Shaughnessy)" 
        />
      </ul>
    </section>
  );
}

!!! працює не тільки для тексту, але й для довільного JSX:
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✅"}
      </del>
    );
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Список речей для пакування Саллі Райд(Sally Ride)</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Космічний костюм" 
        />
        <Item 
          isPacked={true} 
          name="Шолом із золотим листям" 
        />
        <Item 
          isPacked={false} 
          name="Фото Тем О'Шонессі(Tam O'Shaughnessy)" 
        />
      </ul>
    </section>
  );
}
*/

// Challanges
// 1.  Показати значок для незавершених елементів за допомогою `? :` оператора
// Використовуйте умовний оператор (cond ? a : b) для відображення ❌, якщо isPacked не дорівнює true.
/* 
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Список речей для пакування Саллі Райд(Sally Ride)</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Космічний костюм" 
        />
        <Item 
          isPacked={true} 
          name="Шолом із золотим листям" 
        />
        <Item 
          isPacked={false} 
          name="Фото Тем О'Шонессі(Tam O'Shaughnessy)" 
        />
      </ul>
    </section>
  );
}
*/
// 2.  Показати важливість елемента за допомогою `&&` оператора
// У цьому прикладі, кожен Item отримує числовий проп importance.
// Використовуйте оператор && для відображення “(Важливість: X)” курсивом,
// але лише для елементів, важливість яких не дорівнює нулю.
// Ваш список елементів повинен виглядати так:
// - Космічний костюм (Важливість: 9)
// - Шолом з золотим листом
// - Фото Там (Важливість: 6)
// Не забудьте додати пробіл між двома мітками!
/*
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Список речей для пакування Саллі Райд(Sally Ride)</h1>
      <ul>
        <Item 
          importance={9} 
          name="Космічний костюм" 
        />
        <Item 
          importance={0} 
          name="Шолом із золотим листям" 
        />
        <Item 
          importance={6} 
          name="Фото Тем О'Шонессі(Tam O'Shaughnessy)" 
        />
      </ul>
    </section>
  );
}
*/

// 3. Рефакторінг послідовності ? : на if та змінні
/* 
Цей компонент Drink використовує послідовність умов ? : для відображення різної інформації в залежності від того,
чи проп name є "tea" або "coffee".
Проблема в тому, що інформація про кожний напій розподілена між кількома умовами.
Відрефакторіть цей код, щоб використовувати один if замість трьох умов ? :.

function Drink({ name }) {
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{name === 'tea' ? 'leaf' : 'bean'}</dd>
        <dt>Caffeine content</dt>
        <dd>{name === 'tea' ? '15–70 mg/cup' : '80–185 mg/cup'}</dd>
        <dt>Age</dt>
        <dd>{name === 'tea' ? '4,000+ years' : '1,000+ years'}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
*/