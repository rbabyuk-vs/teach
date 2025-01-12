import logo from './logo.svg';
import './App.css';
// JSX — це синтаксичне розширення для JavaScript,
// яке дозволяє вам писати HTML-подібну розмітку всередині файлу JavaScript.


// intro https://uk.react.dev/learn/writing-markup-with-jsx
// valid HTML
/*
<h1>Список завдань Геді Ламари</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Геді Ламар (Hedy Lamarr)" 
  class="photo"
>
<ul>
    <li>Винахід нових світлофорів
    <li>Провести репетицію сцени з фільму
    <li>Вдосконалення технології спектра
</ul>

// JSX
return (
    // Це не зовсім працює!
    <h1>Список завдань Геді Ламари</h1>
    <img 
      src="https://i.imgur.com/yXOvdOSs.jpg" 
      alt="Геді Ламар (Hedy Lamarr)" 
      class="photo"
    >
    <ul>
      <li>Винахід нових світлофорів
      <li>Провести репетицію сцени з фільму
      <li>Вдосконалення технології спектра
    </ul>
  );
}
*/


// Як додавати JSX
// <div>
// або
// фрагмент <> та </>
// 

// NOTE!
// JSX - це не HTML, а JavaScript
// JSX виглядає схожим на HTML, але “під капотом” він перетворюється на звичайні об’єкти JavaScript.
// Ви не можете повернути два об’єкти з функції без обгортання їх у масив.
// Це пояснює, чому ви також не можете повернути два теги JSX без обгортання їх в інший тег або Фрагмент.

// Закривайте всі теги!
// <br> - не закривається в HTML, але в JSX потрібно закривати всі теги.
// <br /> - правильно

// camelCase для всіх більшості речей! 
/*
JSX перетворюється в JavaScript, а атрибути, записані в JSX, стають ключами об’єктів JavaScript
class - зарезервоване, тому використовуйте className
замість stroke-width використовуйте strokeWidth

<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Геді Ламар (Hedy Lamarr)" 
  className="photo"
/>
*/

// Професійна порада: Використовуйте JSX конвертер
// https://transform.tools/html-to-jsx

function App() {
  return (
    <>
    hi there!
    </>
  );
}

export default App;

// challange
// fix this code
/*
export default function Bio() {
  return (
    <div class="intro">
      <h1>Ласкаво просимо на мій сайт!</h1>
    </div>
    <p class="summary">
      Ви можете знайти мої думки тут.
      <br><br>
      <b>Та <i>зображення</b></i> науковців!
    </p>
  );
}
*/