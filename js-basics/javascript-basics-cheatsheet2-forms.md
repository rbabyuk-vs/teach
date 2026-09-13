# Шпаргалка: HTML-форми та JavaScript

## 1. Базова HTML-форма

```html
<form id="order-form">
  <label for="name">Ім’я</label>
  <input id="name" name="name" type="text">

  <button type="submit">Надіслати</button>
</form>

<p id="result"></p>
```

Основні елементи:

| Елемент або атрибут | Призначення |
|---|---|
| `<form>` | об’єднує поля форми |
| `<label>` | описує поле |
| `for` | пов’язує `label` з `id` поля |
| `name` | визначає назву даних |
| `type="submit"` | надсилає форму |

---

## 2. Пошук форми та елементів

```js
const form = document.querySelector("#order-form");
const nameInput = document.querySelector("#name");
const result = document.querySelector("#result");
```

`querySelector()` знаходить перший елемент за CSS-селектором.

---

## 3. Подія `submit`

```js
form.addEventListener("submit", function (event) {
  event.preventDefault();

  console.log("Form submitted");
});
```

- `submit` виникає під час надсилання форми;
- функція всередині `addEventListener()` є обробником події;
- `event.preventDefault()` зупиняє стандартне перезавантаження сторінки.

Краще слухати `submit` форми, а не лише `click` кнопки. Тоді форма працює також після натискання Enter.

---

## 4. Отримання значення поля

```js
const name = nameInput.value;
```

`.value` повертає поточне значення поля.

Для видалення пробілів на початку та в кінці:

```js
const name = nameInput.value.trim();
```

---

## 5. Перевірка даних

```js
const name = nameInput.value.trim();

if (!name) {
  result.textContent = "Введіть ім’я";
  return;
}
```

`return` завершує виконання функції, якщо дані неправильні.

HTML також має базову валідацію:

```html
<input
  id="name"
  name="name"
  type="text"
  required
  minlength="2"
>
```

- `required` — поле обов’язкове;
- `minlength="2"` — потрібно ввести щонайменше два символи.

Перевірка у браузері покращує зручність, але справжній сервер також повинен перевіряти отримані дані.

---

## 6. Основні типи полів

### Текстове поле

```html
<input id="email" name="email" type="email">
```

```js
const email = emailInput.value;
```

### Числове поле

```html
<input id="age" name="age" type="number">
```

```js
const age = Number(ageInput.value);
```

Значення `input` зазвичай отримується як рядок, тому для числа використовуємо `Number()`.

### Checkbox

```html
<input id="rules" name="rules" type="checkbox">
```

```js
const isAccepted = rulesCheckbox.checked;
```

`.checked` повертає `true` або `false`.

### Select

```html
<select id="city" name="city">
  <option value="">Оберіть місто</option>
  <option value="lviv">Львів</option>
  <option value="kyiv">Київ</option>
</select>
```

```js
const city = citySelect.value;
```

### Radio

```html
<label>
  <input type="radio" name="payment" value="cash">
  Готівка
</label>

<label>
  <input type="radio" name="payment" value="card">
  Картка
</label>
```

```js
const selectedPayment = document.querySelector(
  'input[name="payment"]:checked'
);

const payment = selectedPayment?.value;
```

`?.` дозволяє безпечно отримати `value`, навіть якщо користувач нічого не вибрав.

---

## 7. Отримання всіх даних через `FormData`

```js
const formData = new FormData(form);

const name = formData.get("name");
const email = formData.get("email");
```

`FormData` використовує атрибут `name`, а не `id`.

Перетворення даних форми на об’єкт:

```js
const formData = new FormData(form);
const data = Object.fromEntries(formData.entries());

console.log(data);
```

Можливий результат:

```js
{
  name: "Roman",
  email: "roman@example.com"
}
```

Важливо: значення у цьому об’єкті переважно залишаються рядками.

---

## 8. Виведення результату

```js
result.textContent = `Hello, ${name}!`;
```

`textContent` безпечно додає звичайний текст.

Не вставляйте неперевірені дані користувача через `innerHTML`:

```js
// Небезпечно для неперевірених даних
result.innerHTML = name;
```

---

## 9. Очищення форми

```js
form.reset();
```

`reset()` повертає поля до початкових значень.

---

## 10. Повний маленький приклад

```html
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration form</title>
</head>

<body>
  <form id="registration-form">
    <label for="name">Ім’я</label>
    <input id="name" name="name" type="text">

    <label for="age">Вік</label>
    <input id="age" name="age" type="number">

    <label>
      <input name="rules" type="checkbox">
      Погоджуюся з правилами
    </label>

    <button type="submit">Зареєструватися</button>
  </form>

  <p id="message"></p>

  <script>
    const form = document.querySelector("#registration-form");
    const message = document.querySelector("#message");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(form);
      const name = formData.get("name").trim();
      const age = Number(formData.get("age"));
      const acceptedRules = formData.get("rules") !== null;

      if (!name) {
        message.textContent = "Введіть ім’я";
        return;
      }

      if (age < 14) {
        message.textContent = "Мінімальний вік — 14 років";
        return;
      }

      if (!acceptedRules) {
        message.textContent = "Потрібно погодитися з правилами";
        return;
      }

      message.textContent = `Користувача ${name} зареєстровано`;
      form.reset();
    });
  </script>
</body>
</html>
```

---

## Головна логіка

```text
користувач заповнює поля
→ виникає submit
→ preventDefault() зупиняє перезавантаження
→ JavaScript отримує значення
→ перевіряє дані
→ показує результат або помилку
```

## Що потрібно запам’ятати

1. Форму краще обробляти через подію `submit`.
2. `event.preventDefault()` зупиняє стандартне надсилання форми.
3. `.value` отримує значення більшості полів.
4. `.checked` отримує стан checkbox.
5. `Number()` перетворює рядок на число.
6. `FormData` збирає поля, які мають атрибут `name`.
7. Дані потрібно перевірити перед використанням.
8. `textContent` підходить для безпечного виведення тексту.
9. `form.reset()` очищає форму.
