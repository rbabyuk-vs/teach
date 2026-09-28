# Шпаргалка: DOM, API та динамічний каталог

## 1. Від локального масиву до API

Раніше дані зберігалися безпосередньо у JavaScript:

```js
const products = [
  { id: 1, title: "Навушники", price: 1200 },
  { id: 2, title: "Клавіатура", price: 1800 }
];

renderProducts(products);
```

У справжньому застосунку дані часто надходять із сервера:

```text
браузер → HTTP-запит → сервер → JSON-відповідь → JavaScript → DOM
```

Для запитів із браузера можна використовувати `fetch()`.

---

## 2. Асинхронність

Запит до сервера потребує часу. JavaScript не зупиняє всю сторінку, поки очікує відповідь.

Код, результат якого з’явиться пізніше, називають **асинхронним**.

```js
console.log("Початок");

fetch("https://dummyjson.com/products");

console.log("Кінець");
```

Другий `console.log()` не чекає завершення запиту.

---

## 3. Promise

`fetch()` одразу повертає не готові дані, а **Promise** — обіцянку надати результат пізніше.

```js
const request = fetch("https://dummyjson.com/products");

console.log(request); // Promise
```

Promise має три стани:

| Стан | Значення |
|---|---|
| `pending` | операція ще виконується |
| `fulfilled` | операція завершилася успішно |
| `rejected` | сталася помилка |

### `.then()` і `.catch()`

```js
fetch("https://dummyjson.com/products")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data.products);
  })
  .catch(function (error) {
    console.error(error);
  });
```

- `.then()` виконується після успішного завершення попередньої операції;
- `response.json()` читає JSON і також повертає Promise;
- другий `.then()` отримує готовий JavaScript-об’єкт;
- `.catch()` обробляє помилку.

---

## 4. `async` та `await`

`async/await` дозволяє записати асинхронний код так, ніби він виконується послідовно.

```js
async function loadProducts() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();

  console.log(data.products);
}

loadProducts();
```

- `async` позначає асинхронну функцію;
- `await` очікує результат Promise;
- `await` можна використовувати всередині `async`-функції.

Відповідність двох способів запису:

| Promise | `async/await` |
|---|---|
| `.then()` | `await` |
| `.catch()` | `try...catch` |

---

## 5. `fetch()` і перевірка відповіді

`fetch()` не завжди вважає статуси `404` або `500` помилкою JavaScript. Тому потрібно перевіряти `response.ok`.

```js
async function loadProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) {
      throw new Error(`HTTP-помилка: ${response.status}`);
    }

    const data = await response.json();
    renderProducts(data.products);
  } catch (error) {
    console.error(error);
    showError("Не вдалося завантажити товари");
  }
}
```

Послідовність роботи:

1. `fetch()` надсилає HTTP-запит.
2. `await` очікує відповідь.
3. `response.ok` перевіряє успішність відповіді.
4. `response.json()` перетворює JSON на JavaScript-дані.
5. `renderProducts()` показує товари на сторінці.
6. `catch` обробляє помилку.

---

## 6. JSON

**JSON** — текстовий формат обміну даними.

Приклад відповіді API:

```json
{
  "products": [
    {
      "id": 1,
      "title": "Навушники",
      "price": 1200
    }
  ]
}
```

Після `response.json()` із цими даними можна працювати як зі звичайним об’єктом JavaScript:

```js
const data = await response.json();
const products = data.products;
```

У DummyJSON товари містяться саме у властивості `products`, а не безпосередньо у `data`.

---

## 7. Рендеринг каталогу в DOM

HTML містить порожній контейнер:

```html
<div id="catalog"></div>
```

JavaScript створює картку для кожного товару:

```js
const catalog = document.querySelector("#catalog");

function renderProducts(products) {
  catalog.replaceChildren();

  products.forEach(function (product) {
    const card = document.createElement("article");
    const title = document.createElement("h2");
    const price = document.createElement("p");
    const button = document.createElement("button");

    title.textContent = product.title;
    price.textContent = `${product.price} $`;
    button.textContent = "Додати до кошика";
    button.dataset.id = product.id;

    card.append(title, price, button);
    catalog.append(card);
  });
}
```

`textContent` безпечніше використовувати для даних, які прийшли з API. Не вставляйте неперевірені дані через `innerHTML`.

---

## 8. Події в динамічному каталозі

Картки створюються після завантаження даних. Для великої кількості кнопок зручно додати один обробник до контейнера.

```js
catalog.addEventListener("click", function (event) {
  if (!event.target.matches("button[data-id]")) {
    return;
  }

  const productId = Number(event.target.dataset.id);
  addToCart(productId);
});
```

Це називається **делегуванням подій**: подію обробляє спільний батьківський елемент.

---

## 9. Пошук і фільтрація

Після завантаження збережіть товари у змінній:

```js
let allProducts = [];

async function loadProducts() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();

  allProducts = data.products;
  renderProducts(allProducts);
}
```

Фільтрація локально завантажених товарів:

```js
const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", function () {
  const query = searchInput.value.trim().toLowerCase();

  const filteredProducts = allProducts.filter(function (product) {
    return product.title.toLowerCase().includes(query);
  });

  renderProducts(filteredProducts);
});
```

Якщо результатів немає, сторінка повинна це пояснити:

```js
function renderProducts(products) {
  catalog.replaceChildren();

  if (products.length === 0) {
    catalog.textContent = "Товарів не знайдено";
    return;
  }

  // Створення карток
}
```

---

## 10. Стани сторінки

Інтерфейс повинен показувати користувачеві, що зараз відбувається.

| Стан | Що показати |
|---|---|
| завантаження | «Завантажуємо товари…» |
| успіх | каталог товарів |
| порожній результат | «Товарів не знайдено» |
| помилка | повідомлення і кнопку «Спробувати ще раз» |

```js
const statusElement = document.querySelector("#status");

function showLoading() {
  statusElement.textContent = "Завантажуємо товари…";
}

function showError(message) {
  statusElement.textContent = message;
}

function clearStatus() {
  statusElement.textContent = "";
}
```

Головне правило: користувач не повинен бачити порожню сторінку й здогадуватися, що сталося.

---

## 11. Кошик і стан застосунку

**Стан** — дані, які можуть змінюватися під час роботи сторінки.

```js
let cart = [];

function addToCart(productId) {
  const product = allProducts.find(function (item) {
    return item.id === productId;
  });

  if (!product) {
    showError("Товар не знайдено");
    return;
  }

  cart.push(product);
  renderCart();
}
```

Після зміни стану потрібно оновити DOM:

```text
подія користувача → зміна масиву cart → renderCart() → оновлений DOM
```

---

## 12. `localStorage`

`localStorage` зберігає рядки у браузері навіть після перезавантаження сторінки.

Збереження масиву:

```js
localStorage.setItem("cart", JSON.stringify(cart));
```

Отримання масиву:

```js
const savedCart = localStorage.getItem("cart");

if (savedCart) {
  cart = JSON.parse(savedCart);
}
```

- `JSON.stringify()` перетворює значення на JSON-рядок;
- `JSON.parse()` перетворює JSON-рядок назад на JavaScript-значення.

Не зберігайте у `localStorage` паролі, платіжні дані та іншу конфіденційну інформацію.

---

## 13. Форми у повному сценарії

Повний сценарій інтернет-магазину може виглядати так:

```text
завантаження каталогу → пошук → вибір товару → кошик → форма → перевірка → підтвердження
```

Обробка форми:

```js
const orderForm = document.querySelector("#order-form");

orderForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(orderForm);
  const name = formData.get("name").trim();

  if (name.length < 2) {
    showError("Введіть ім’я");
    return;
  }

  showSuccess("Замовлення оформлено");
});
```

Перевіряти потрібно не тільки окремі поля, а й увесь сценарій. Наприклад, не можна оформити замовлення з порожнім кошиком.

---

## 14. Перевірка сценаріїв і помилок

Перед здачею перевірте:

- каталог успішно завантажився;
- під час завантаження видно повідомлення;
- помилка запиту не ламає сторінку;
- пошук знаходить потрібні товари;
- для відсутнього товару показано зрозуміле повідомлення;
- кнопка додає правильний товар;
- кошик правильно оновлюється;
- після перезавантаження локальні дані відновлюються;
- форму неможливо надіслати з неправильними даними;
- успішна дія має видимий результат.

Для перевірки помилки можна тимчасово змінити адресу:

```js
fetch("https://dummyjson.com/wrong-address");
```

---

## 15. Рекомендована структура коду

```js
let allProducts = [];
let cart = [];

async function loadProducts() {}
function renderProducts(products) {}
function filterProducts(query) {}
function addToCart(productId) {}
function removeFromCart(productId) {}
function renderCart() {}
function saveCart() {}
function loadCart() {}
function validateOrder(data) {}
function showLoading() {}
function showError(message) {}
function showSuccess(message) {}
```

Одна функція повинна виконувати одну зрозумілу задачу.

---

## Коротко: що потрібно розуміти

- `fetch()` надсилає запит і повертає Promise;
- Promise представляє результат, який з’явиться пізніше;
- `await` очікує завершення Promise всередині `async`-функції;
- `response.ok` потрібно перевіряти самостійно;
- `response.json()` перетворює JSON на JavaScript-дані;
- отримані дані можна передати у вже знайому функцію `renderProducts()`;
- стан зберігається у змінних, а інтерфейс відображається через DOM;
- користувач повинен бачити завантаження, результат, порожній стан і помилку;
- `localStorage` зберігає лише рядки;
- повний сценарій потрібно перевіряти від першої дії до результату.

## API для прикладів

У прикладах використано навчальний API:

```text
https://dummyjson.com/products
```

Документація: <https://dummyjson.com/docs/products>
