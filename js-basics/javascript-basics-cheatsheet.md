# Шпаргалка: основи JavaScript

## 1. Коментарі

Коментарі пояснюють код і не виконуються JavaScript.

```js
// Однорядковий коментар

/*
  Багаторядковий
  коментар
*/
```

### Маленький приклад

```js
const price = 100;

// Зменшуємо ціну на 10%
const discountedPrice = price * 0.9;

console.log(discountedPrice); // 90
```

---

## 2. Змінні: `let` і `const`

- `let` — значення можна змінити;
- `const` — змінну не можна перепризначити;
- за можливості використовуємо `const`, а `let` — коли значення справді змінюється.

```js
let name = "Roman";
name = "Oksana";

const lastName = "Smith";
// lastName = "Bond"; // Помилка
```

### Маленький приклад

```js
const ticketPrice = 200;
let ticketCount = 2;

ticketCount = 3;

const total = ticketPrice * ticketCount;
console.log(total); // 600
```

---

## 3. Типи даних

| Тип | Приклад |
|---|---|
| `string` | `"Hello"` |
| `number` | `18`, `18.5`, `123e5` |
| `boolean` | `true`, `false` |
| `undefined` | змінна без значення |
| `null` | навмисно порожнє значення |
| `object` | об’єкт або масив |

```js
let value;                 // undefined
const age = 18;            // number
const price = 18.94;       // number
const largeNumber = 123e5; // 12 300 000
const isLoading = false;   // boolean
const selectedUser = null; // null
```

Обережно з дробовими числами:

```js
console.log(0.2 + 0.1); // 0.30000000000000004
```

### Маленький приклад

```js
const productName = "Coffee";
const productPrice = 80;
const isAvailable = true;
let discount;

console.log(typeof productName);  // string
console.log(typeof productPrice); // number
console.log(typeof isAvailable);  // boolean
console.log(discount);            // undefined
```

---

## 4. Рядки

Рядок можна записати за допомогою одинарних лапок, подвійних лапок або зворотних лапок.

```js
const firstName = 'Roman';
const book = "The 'Hobbit'";
const part = 1;

const favoriteMovie = `Matrix ${part}`;
const greeting = `Hello, ${firstName}, how are you?`;
```

Зворотні лапки дозволяють вставляти значення через `${...}`.

### Маленький приклад

```js
const customer = "Oksana";
const amount = 250;

const message = `Hello, ${customer}! Total: ${amount} UAH.`;
console.log(message);
```

---

## 5. Об’єкти

Об’єкт зберігає пов’язані значення у форматі `ключ: значення`.

```js
const movie = {
  name: "Matrix",
  genre: "science fiction",
  year: 1999
};

console.log(movie.name);
console.log(movie["genre"]);

movie.director = "The Wachowskis";
movie.genre = "action";
delete movie.year;
```

### Чому можна змінювати об’єкт, оголошений через `const`?

`const` забороняє перепризначити всю змінну, але не забороняє змінювати властивості об’єкта.

```js
const movie = { name: "Matrix" };

movie.name = "Star Wars";     // Можна
// movie = { name: "Dune" };  // Не можна
```

### Об’єкти зберігаються за посиланням

```js
const movie1 = { name: "Matrix" };
const movie2 = movie1;

movie2.name = "The Hobbit";

console.log(movie1.name); // The Hobbit
```

`movie1` і `movie2` посилаються на той самий об’єкт.

### Обчислювана назва властивості

```js
const propertyName = "rating";

const movie = {
  name: "Matrix",
  [propertyName]: 9
};

console.log(movie.rating); // 9
```

---

## 6. Масиви, `push()` і `map()`

Масив зберігає впорядкований список значень. Індекс першого елемента — `0`.

```js
const fruits = ["apple", "peach", "watermelon"];

console.log(fruits[0]); // apple

fruits.push("mango");
console.log(fruits);
```

`map()` проходить по масиву та створює новий масив.

```js
const fruits = ["apple", "peach", "mango"];

const labels = fruits.map(function (fruit, index) {
  return `Fruit ${index}: ${fruit}`;
});

console.log(labels);
```

Коротший запис зі стрілковою функцією:

```js
const labels = fruits.map(
  (fruit, index) => `Fruit ${index}: ${fruit}`
);
```

---

## 7. Деструктуризація

Деструктуризація дозволяє отримати значення з об’єкта або масиву в окремі змінні.

### Об’єкт

```js
const movie = {
  name: "Matrix",
  director: "The Wachowskis",
  year: 1999
};

const {
  name: movieName,
  director,
  country = "USA"
} = movie;

console.log(movieName);
console.log(director);
console.log(country);
```

`name: movieName` означає: взяти властивість `name` і записати її у змінну `movieName`.

### Вкладений об’єкт

```js
const harryPotter = {
  author: "J. K. Rowling",
  books: ["Philosopher's Stone", "Chamber of Secrets"],
  firstBook: {
    name: "Philosopher's Stone",
    year: 1997
  }
};

const {
  author,
  firstBook: { name: firstBookName }
} = harryPotter;

console.log(author);
console.log(firstBookName);
```

### Масив

```js
const fruits = ["apple", "orange", "clementine", "peach"];
const [apple, orange] = fruits;

console.log(apple);  // apple
console.log(orange); // orange
```

---

## 8. Rest і spread

Обидва використовують `...`, але виконують різні завдання.

### Rest — збирає решту значень

```js
const fruits = ["apple", "orange", "peach", "pear"];
const [apple, orange, ...otherFruits] = fruits;

console.log(otherFruits); // ["peach", "pear"]
```

```js
const user = {
  name: "Roman",
  age: 30,
  city: "Lviv"
};

const { name, ...otherData } = user;
console.log(otherData); // { age: 30, city: "Lviv" }
```

### Spread — розкладає або копіює значення

```js
const fruits = ["apple", "orange"];
const moreFruits = [...fruits, "mango"];
```

```js
const movie = {
  name: "Matrix",
  details: {
    year: 1999
  }
};

const movieCopy = {
  ...movie,
  details: {
    ...movie.details
  }
};
```

Вкладені об’єкти потрібно копіювати окремо.

---

## 9. Оператори порівняння і логічні оператори

### Порівняння

| Оператор | Значення |
|---|---|
| `===` | однакове значення й однаковий тип |
| `!==` | значення або тип відрізняється |
| `>` | більше |
| `<` | менше |
| `>=` | більше або дорівнює |
| `<=` | менше або дорівнює |

Краще використовувати `===` і `!==`, а не `==` і `!=`.

```js
console.log(5 === 5);   // true
console.log(5 === "5"); // false
```

### Логічні оператори

| Оператор | Значення |
|---|---|
| `&&` | і |
| `\|\|` | або |
| `!` | не |

```js
const age = 20;
const hasDocument = true;

if (age >= 18 && hasDocument) {
  console.log("Access allowed");
}
```

---

## 10. Умови й тернарний оператор

### `if...else`

```js
const age = 17;

if (age < 18) {
  console.log("Too young");
} else {
  console.log("Old enough");
}
```

### Тернарний оператор

```js
const age = 17;
const message = age < 18 ? "Too young" : "Old enough";

console.log(message);
```

Схема:

```text
умова ? значення_якщо_true : значення_якщо_false
```

---

## 11. Цикл `for`

Цикл повторює дію, поки умова залишається істинною.

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

### Обхід масиву

```js
const dishes = ["pizza", "burger", "fish and chips"];

for (let i = 0; i < dishes.length; i++) {
  console.log(i, dishes[i]);
}
```

- `let i = 0` — початкове значення;
- `i < dishes.length` — умова продовження;
- `i++` — збільшення `i` на одиницю.

---

## 12. Функції

Функція — блок коду, який можна викликати багато разів.

### Function declaration

```js
function sum(a, b) {
  return a + b;
}

console.log(sum(2, 4)); // 6
```

Таку функцію можна викликати навіть вище місця її оголошення.

### Function expression

```js
const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(3, 3)); // 9
```

### Arrow function

```js
const sum = (a, b) => {
  return a + b;
};
```

Короткий запис для одного виразу:

```js
const sum = (a, b) => a + b;
```

У короткому записі не пишемо `return`.

### Значення параметра за замовчуванням

```js
const greet = (name = "Guest") => {
  return `Hello, ${name}!`;
};

console.log(greet()); // Hello, Guest!
```

### Rest parameters

```js
const sumAll = (...numbers) => {
  let total = 0;

  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }

  return total;
};

console.log(sumAll(3, 5, 7, 8)); // 23
```

---

## 13. Обробка помилок

`try...catch` дозволяє перехопити помилку, щоб програма не завершилася аварійно.

```js
const printDishes = (dishes) => {
  try {
    for (let i = 0; i < dishes.length; i++) {
      console.log(dishes[i]);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

printDishes(undefined);
```

Якщо проблема лише у відсутньому аргументі, часто простіше задати значення за замовчуванням:

```js
const printDishes = (dishes = []) => {
  for (let i = 0; i < dishes.length; i++) {
    console.log(dishes[i]);
  }
};
```

---

## 14. JavaScript у React/JSX

JSX схожий на HTML, але всередині `{}` можна використовувати JavaScript.

### Виведення значень

```jsx
const movie = {
  name: "Star Wars",
  director: "George Lucas"
};

function App() {
  return (
    <div>
      <h1>{movie.name}</h1>
      <p>{movie.director}</p>
    </div>
  );
}

export default App;
```

### Props і деструктуризація

```jsx
function Movie({ name, director }) {
  if (!name) {
    return null;
  }

  return (
    <div>
      <h1>{name}</h1>
      <h2>{director}</h2>
    </div>
  );
}

function App() {
  return (
    <Movie
      name="Star Wars"
      director="George Lucas"
    />
  );
}
```

### Передавання об’єкта через spread

```jsx
const movie = {
  name: "Star Wars",
  director: "George Lucas"
};

<Movie {...movie} />
```

Це рівнозначно:

```jsx
<Movie name={movie.name} director={movie.director} />
```

### Умовний рендеринг

```jsx
function User({ name, gender = "male" }) {
  if (!name) {
    return <p>No user</p>;
  }

  const title = gender === "male" ? "пан" : "пані";

  return <h1>Привіт, {title} {name}</h1>;
}
```

Короткий варіант:

```jsx
const Movie = ({ name = "Matrix" }) => <h1>{name}</h1>;
```

### Виведення масиву через `map()`

```jsx
const fruits = ["apple", "peach", "mango"];

function FruitList() {
  return (
    <div>
      {fruits.map((fruit, index) => (
        <p key={fruit}>
          Fruit {index}: {fruit}
        </p>
      ))}
    </div>
  );
}
```

`key` допомагає React розрізняти елементи списку.

---

## Ключова логіка

```text
змінні зберігають значення
→ тип даних визначає, що це за значення
→ об’єкти й масиви групують дані
→ умови вибирають дію
→ цикли повторюють дію
→ функції оформлюють повторювану логіку
→ destructuring, rest і spread спрощують роботу з даними
→ React використовує JavaScript усередині JSX
```
