# Шпаргалка: React Router

## 1. Для чого він потрібен

**React Router** показує потрібний React-компонент залежно від адреси у браузері.

| Адреса | Що показує застосунок |
|---|---|
| `/` | головна сторінка |
| `/courses` | список курсів |
| `/courses/2` | подробиці курсу з `id` 2 |

Під час переходу через `Link` адреса змінюється, а React оновлює вміст без повного перезавантаження документа.

## 2. Встановлення й підключення

У терміналі, у папці React-проєкту:

```bash
npm install react-router
```

Огорніть `App` у `BrowserRouter` у файлі **`src/main.jsx`**:

```jsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

`BrowserRouter` підключає маршрутизацію для всіх компонентів усередині нього. Достатньо одного такого обгортання.

> У цій шпаргалці використано пакет `react-router`. У старіших прикладах ви можете бачити імпорти з `react-router-dom`. Якщо ваш проєкт уже працює з ним, узгодьте імпорти з установленим пакетом.

## 3. Маршрути та посилання

Мінімальний приклад **`src/App.jsx`**:

```jsx
import { Link, Route, Routes } from "react-router";

function HomePage() {
  return <h1>Головна сторінка</h1>;
}

function CoursesPage() {
  return <h1>Навчальні курси</h1>;
}

function NotFoundPage() {
  return <h1>404 — сторінку не знайдено</h1>;
}

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Головна</Link>{" | "}
        <Link to="/courses">Курси</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
```

| Запис | Призначення |
|---|---|
| `Routes` | визначає, який маршрут відповідає поточній адресі |
| `Route` | пов’язує адресу з компонентом |
| `path` | адреса або її шаблон |
| `element` | компонент, який потрібно показати: `<HomePage />` |
| `Link` | посилання для переходу всередині застосунку |
| `to` | адреса переходу |
| `path="*"` | невідома адреса |

Меню стоїть поза `Routes`, тому залишається видимим на всіх сторінках.

## 4. Один маршрут — різні курси

Не потрібно створювати окремий компонент для кожного курсу.

Додайте всередину `Routes` маршрут:

```jsx
<Route path="/courses/:id" element={<CoursePage />} />
```

`:id` — змінна частина адреси. Наприклад, у `/courses/2` вона дорівнює `"2"`.

Додайте `useParams` до імпорту у `App.jsx`:

```jsx
import { Link, Route, Routes, useParams } from "react-router";
```

Перед компонентом `App` додайте дані та компонент сторінки:

```jsx
const courses = [
  { id: 1, title: "Основи HTML", teacher: "Олена Коваль" },
  { id: 2, title: "Основи React", teacher: "Роман Бондар" }
];

function CoursePage() {
  const { id } = useParams();
  const course = courses.find(function (item) {
    return item.id === Number(id);
  });

  if (!course) {
    return (
      <>
        <p>Такого курсу немає</p>
        <Link to="/courses">До списку курсів</Link>
      </>
    );
  }

  return (
    <article>
      <h1>{course.title}</h1>
      <p>Викладач: {course.teacher}</p>
      <Link to="/courses">До списку курсів</Link>
    </article>
  );
}
```

`useParams()` читає параметри маршруту. Значення `id` приходить як **рядок**, тому для порівняння з числовим `item.id` використано `Number(id)`.

Замініть попереднє визначення `CoursesPage` цим варіантом зі списком:

```jsx
function CoursesPage() {
  return (
    <section>
      <h1>Навчальні курси</h1>
      {courses.map(function (course) {
        return (
          <p key={course.id}>
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          </p>
        );
      })}
    </section>
  );
}
```

**Зверніть увагу:** `/something` потрапить на сторінку 404. Адреса `/courses/999` відповідає маршруту `/courses/:id`, тому відсутність самого курсу перевіряє `CoursePage`.

## 5. Додатково: активний пункт меню

`NavLink` працює як `Link`, але додає CSS-клас `active` до активного посилання. За бажанням замініть блок `nav` у `App` на `<Menu />`:

```jsx
import { NavLink } from "react-router";

function Menu() {
  return (
    <nav>
      <NavLink to="/" end>Головна</NavLink>{" | "}
      <NavLink to="/courses">Курси</NavLink>
    </nav>
  );
}
```

```css
nav a.active {
  font-weight: bold;
  color: darkblue;
}
```

## Що запам’ятати

- `BrowserRouter` огортає застосунок один раз.
- `Route` відповідає на запитання: «Який компонент показати за цією адресою?»
- Для звичайних переходів усередині застосунку використовуйте `Link` і `to`.
- Для зовнішнього сайту підійде звичайне `<a href="https://example.com">`.
- `:id` задає параметр маршруту, а `useParams()` читає його.
- Невідомий маршрут і відсутній об’єкт за правильним маршрутом — дві окремі перевірки.

Офіційні приклади: [підключення](https://reactrouter.com/start/declarative/installation), [маршрути](https://reactrouter.com/start/declarative/routing), [навігація](https://reactrouter.com/start/declarative/navigating), [useParams](https://reactrouter.com/api/hooks/useParams).
