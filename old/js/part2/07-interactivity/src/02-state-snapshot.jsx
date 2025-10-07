// https://uk.react.dev/learn/adding-interactivity#state-as-a-snapshot

import { useState } from 'react';
import "./App.css";

export default function Form() {
  const [to, setTo] = useState('Аліса');
  const [message, setMessage] = useState('Привіт');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`Ви надіслали ${message} користувачу ${to}`);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Кому:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}>
          <option value="Alice">Аліса</option>
          <option value="Bob">Боб</option>
        </select>
      </label>
      <textarea
        placeholder="Повідомлення"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Надіслати</button>
    </form>
  );
}
