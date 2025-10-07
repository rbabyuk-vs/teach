# this is a typical react app. nothing special user `npm start` for dev run.

#  1. no react router

```js
import React, { Fragment } from "react";
import "./index.css"

export default function App() {
  return (
    <main>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        </nav>
     </main>
  );
}
// Home Page
const Home = () => (
  <Fragment>
    <h1>Home</h1>
    <FakeText />
  </Fragment>
  );
// About Page
const About = () => (
  <Fragment>
    <h1>About</h1>
    <FakeText />
  </Fragment>
  );
// Contact Page
const Contact = () => (
  <Fragment>
    <h1>Contact</h1>
    <FakeText />
  </Fragment>
  );

const FakeText = () => (
  <p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
  )
```

- ці лінки -  простий HTML anchor tag.
- коли клікаєш, відбувається повний релоад сторінки.
- Оскільки немає <Router> або <Routes>, React не перехоплює ці зміни URL.
- Це статична сторінка - рендериться лише <App />, а не Home, About чи Contact.

> **_Note!_** Отже, навіть якщо ви визначили компоненти Home, About і Contact, вони ніколи не використовуються. Насправді ви взагалі не виконуєте маршрутизацію.

# 2. Використовує `<Router>`

## P.S. `npm install react-router-dom`

```js
import React, { Fragment } from "react";
import "./index.css"

import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
  <Router>
    <main>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </main>
</Router>
  );
}
```

- Ця версія представляє компонент BrowserRouter (псевдонім Router).
- Router дозволяє React обробляти маршрутизацію внутрішньо, перехоплюючи посилання та оновлюючи інтерфейс без повного перезавантаження сторінки.
- Але є проблема...

> _Все ще не використовує компоненти <Routes> або <Route>, тому нічого не змінюється, коли ви натискаєте на посилання. Ви все ще використовуєте звичайні якірні теги замість <Link> з react-router-dom._

# 3. отже, як почати правильно?

```js
import { Routes, Route, Link } from "react-router-dom";

<Router>
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  </nav>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</Router>
```

- Link замінює <a>, щоб уникнути повного перезавантаження.
- `Routes` і `Route` вказують React Router, який компонент рендерити для кожної URL-адреси.

# 4. повний приклад

```js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";

export default function App() {
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li><Link to="/">Головна</Link></li>
            <li><Link to="/about">Про нас</Link></li>
            <li><Link to="/contact">Контакти</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

// Головна сторінка
const Home = () => (
  <>
    <h1>Головна</h1>
    <FakeText />
  </>
);

// Про нас
const About = () => (
  <>
    <h1>Про нас</h1>
    <FakeText />
  </>
);

// Контакти
const Contact = () => (
  <>
    <h1>Контакти</h1>
    <FakeText />
  </>
);

// 404 сторінка
const NotFound = () => (
  <h1>Сторінку не знайдено (404)</h1>
);

// Текст для прикладу
const FakeText = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat.
  </p>
);
```

```css
body {
  font-family: sans-serif;
  padding: 20px;
}
nav ul {
  list-style: none;
  display: flex;
  gap: 10px;
}
nav ul li {
  display: inline;
}
a {
  text-decoration: none;
  color: blue;
}
a:hover {
  text-decoration: underline;
}
```
- При переході по посиланнях (Головна / Про нас / Контакти) — React сам перемикає компоненти без перезавантаження сторінки.
- Якщо ввести неіснуючий шлях у URL, буде показано "Сторінку не знайдено (404)".

# 5. параметри

```js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import "./index.css";

export default function App() {
  const name = "John Doe";

  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to={`/about/${name}`}>About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/:name" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  );
}

const Home = () => (
  <>
    <h1>Home</h1>
    <FakeText />
  </>
);

const About = () => {
  const { name } = useParams(); // новий спосіб доступу до параметрів маршруту
  return (
    <>
      <h1>About {name}</h1>
      <FakeText />
    </>
  );
};

const Contact = () => (
  <>
    <h1>Contact</h1>
    <FakeText />
  </>
);

const FakeText = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat.
  </p>
);
```

# 6. guarding routes

```js
import React from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

export default function App() {
  const name = "John Doe";
  const isAuthenticated = false;

  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to={`/about/${name}`}>About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />

          {isAuthenticated ? (
            <>
              <Route path="/about/:name" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </>
          ) : (
            <>
              <Route path="/about/:name" element={<Navigate to="/" replace />} />
              <Route path="/contact" element={<Navigate to="/" replace />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

// Домашня сторінка
const Home = () => (
  <>
    <h1>Головна</h1>
    <FakeText />
  </>
);

// Сторінка About з параметром
const About = () => {
  const { name } = useParams();
  return (
    <>
      <h1>Про {name}</h1>
      <FakeText />
    </>
  );
};

// Контакти
const Contact = () => (
  <>
    <h1>Контакти</h1>
    <FakeText />
  </>
);

// Сторінка 404
const NotFound = () => <h1>Сторінку не знайдено</h1>;

// Демо-текст
const FakeText = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua.
  </p>
);
```

# 7. хуки `useNavigate`, `useParams`, `useLocation`

```js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Головна</Link></li>
          <li><Link to="/profile/42">Профіль</Link></li>
          <li><Link to="/search?q=react">Пошук</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

// home and useNavigate
function Home() {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile/99"); // Програмна навігація
  };

  return (
    <div>
      <h1>Головна</h1>
      <button onClick={goToProfile}>Перейти до мого профілю</button>
    </div>
  );
}

// Profile з useParams
function Profile() {
  const { id } = useParams(); // Отримуємо параметр з URL: /profile/:id

  return (
    <div>
      <h1>Профіль користувача #{id}</h1>
    </div>
  );
}

// Search з useLocation
function Search() {
  const location = useLocation();

  // Отримуємо query параметри, наприклад ?q=react
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  return (
    <div>
      <h1>Результати пошуку для: {query}</h1>
    </div>
  );
}
```

- useNavigate()
* Використовується для програмної навігації.
* Альтернатива застарілому useHistory().
* ✅ Приклад: navigate("/profile/123") — перенаправляє користувача вручну.

- useParams()
* Отримує параметри з URL, наприклад :id у /profile/:id.
* ✅ Приклад: const { id } = useParams() — повертає { id: "123" } для /profile/123.

- useLocation()
* Дає доступ до інформації про поточну адресу (шлях, query-параметри тощо).
```js
const location = useLocation();
const q = new URLSearchParams(location.search).get("q");
```