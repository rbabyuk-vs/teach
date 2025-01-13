import logo from './logo.svg';
import './App.css';

// https://uk.react.dev/learn/your-first-component
// Компоненти є одним з основних понять React
// у HTML ви можете створювати багато структурні документи
/*
<article>
  <h1>Мій перший компонент</h1>
  <ol>
    <li>Компоненти: Будівельні блоки UI</li>
    <li>Визначення компонента</li>
    <li>Використання компонента</li>
  </ol>
</article>

цей код можна перетворити в компонент
const TableOfContents = () => (
  <>
    <article>
    <h1>Мій перший компонент</h1>
    <ol>
      <li>Компоненти: Будівельні блоки UI</li>
      <li>Визначення компонента</li>
      <li>Використання компонента</li>
    </ol>
  </article>
  </>
)
*/

const TableOfContents = () => (
  <>
    <article>
    <h1>Мій перший компонент</h1>
    <ol>
      <li>Компоненти: Будівельні блоки UI</li>
      <li>Визначення компонента</li>
      <li>Використання компонента</li>
    </ol>
  </article>
  </>
)

/* 
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Документація</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
 */

// компонент React - це функція JavaScript, яку можна посипати розміткою.
/* export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Кетерін Джонсон (Katherine Johnson)"
    />
  )
} */

// як створити компонент
// Крок 1: Експортування компонента
//    Префікс export default це стандартний синтаксис JavaScript (не специфічний для React). 
// Крок 2: Визначення функції компонента
//    За допомогою function Profile() { } ви визначаєте функцію JavaScript з іменем Profile.
// Крок 3: додавання розмітки
//    Компонент повертає тег <img /> з атрибутами src та alt. <img /> записаний як HTML, але насправді це JavaScript під капотом!


// Застосування компонента
/* function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Кетерін Джонсон (Katherine Johnson)"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Видатні вчені</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
} */
// Що бачить браузер 
// Зверніть увагу на відмінність у регістрі літер:

// <section> написано у нижньому регістрі, тому React знає, що ми звертаємось до HTML-тегу.
// <Profile /> починається з великої літери P, тому React знає, що ми хочемо використовувати наш компонент з назвою Profile.


function App() {
  return (
    TableOfContents()
  );
}

export default App;

// challange
// 1. Експорт компонента 
// Код в цій пісочниці не працює, тому що основний компонент не експортований:
/* function Profile() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Аклілу Лемма (Aklilu Lemma)"
    />
  );
}
 */

// 2. Виправте оператор return 
// З цим оператором return щось не так. Чи можете ви виправити його?
/* export default function Profile() {
  return
    <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Кацуко Сарухаші (Katsuko Saruhashi)" />;
} */

// 3. Виправте помилку
// Щось не так з оголошенням та використанням компонента Profile. Чи можете ви знайти помилку? (Спробуйте пригадати, як React відрізняє компоненти від звичайних HTML-тегів!)
/* function profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Алан Л. Гарт (Alan L. Hart)"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Видатні вчені</h1>
      <profile />
      <profile />
      <profile />
    </section>
  );
}
 */

// 4. Ваш власний компонент 
// Напишіть компонент з нуля. Ви можете дати йому будь-яку валідну назву та повернути будь-яку розмітку. Якщо у вас закінчилися ідеї, ви можете написати компонент Congratulations, який показує <h1>Гарна робота!</h1>. Не забудьте експортувати його!
// Напишіть свій компонент нижче!
