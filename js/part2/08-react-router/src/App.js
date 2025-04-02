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
