# Сайт доставки піци

## Завдання:

> Реалізувати міні-додаток для замовлення піци з використанням React Router v6:

* `/` — Головна. Картки з піцами. При кліку `→` перехід на `/pizza/:name`
* `/pizza/:name` — Інформація про піцу. Кнопка “Замовити” `→` переходить до `/checkout?from=:name`
* `/checkout` — Виводить “Ви замовили піцу `:name`”
* Якщо піца не вибрана — редірект на головну

> **_Note!_** В обов'язкових хуках: useParams, useNavigate, useLocation
> P.S. як завжди - код на гіт!

- Додати обробку декількох піц
- Зробити перевірку на порожнє замовлення
- Попрацювати з query параметрами
- Можливо, додати форму для введення імені клієнта (опційно)

## starter-код:

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Pizza from './components/Pizza';
import Checkout from './components/Checkout';

export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Головна</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza/:name" element={<Pizza />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<h1>Сторінку не знайдено</h1>} />
      </Routes>
    </Router>
  );
}


// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const pizzas = ["margherita", "pepperoni", "css-special"];

export default function Home() {
  return (
    <div>
      <h1>Меню піци</h1>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza}>
            <Link to={`/pizza/${pizza}`}>Піца {pizza}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


// src/components/Pizza.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Pizza() {
  const { name } = useParams();
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate(`/checkout?from=${name}`);
  };

  return (
    <div>
      <h1>Піца: {name}</h1>
      <button onClick={handleOrder}>Замовити</button>
    </div>
  );
}


// src/components/Checkout.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const from = query.get("from");

  if (!from) {
    navigate("/");
    return null;
  }

  return (
    <div>
      <h1>Ви замовили піцу: {from}</h1>
      <button onClick={() => navigate("/")}>На головну</button>
    </div>
  );
}


// src/index.css
body {
  font-family: sans-serif;
  margin: 0;
  padding: 20px;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 10px;
}

nav ul li {
  display: inline;
}

nav a {
  text-decoration: none;
  color: #007bff;
}

nav a:hover {
  text-decoration: underline;
}

```