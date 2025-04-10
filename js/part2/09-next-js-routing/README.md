## Getting started:

```sh
npx create-next-app next-test
✔ Would you like to use TypeScript? … **No** / Yes
✔ Would you like to use ESLint? … **No** / Yes
✔ Would you like to use Tailwind CSS? … **No** / Yes
✔ Would you like your code inside a `src/` directory? … **No** / Yes
✔ Would you like to use App Router? (recommended) … **No** / Yes
✔ Would you like to use Turbopack for `next dev`? … **No** / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … **No** / Yes
```

First, run the development server:

```bash
npm run dev
```

## початок

Next.js використовує файлову систему, щоб увімкнути маршрутизацію в додатку. Next автоматично розглядає кожен файл з розширеннями .js, .jsx, .ts або .tsx у каталозі сторінок як маршрут. Сторінка в Next.js - це React-компонент, який має маршрут, заснований на імені його файлу.

Наприклад структура:

```sh
pages/
├── index.js             → /
├── about.js             → /about
├── profile/
│   └── [name].js        → /profile/:name
├── checkout.js          → /checkout
```

### навігація по файлах

> `pages/index.js`
```js
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Головна</h1>
      <ul>
        <li><Link href="/about">Про нас</Link></li>
        <li><Link href="/profile/Andriy">Профіль Андрія</Link></li>
        <li><Link href="/checkout?pizza=pepperoni">Замовити піцу</Link></li>
      </ul>
    </main>
  );
}
```

> `pages/about.js`

```js
export default function About() {
  return <h1>Про нас</h1>;
}
```

> `pages/checkout.js`

```js
import { useRouter } from 'next/router';

export default function Checkout() {
  const router = useRouter();
  const { pizza } = router.query;

  return <h1>Ви замовили піцу: {pizza || 'немає даних'}</h1>;
}
```

### динамічні маршрути

Next.js дозволяє визначати динамічні маршрути у вашому додатку за допомогою дужок ([param]). Замість того, щоб задавати статичну назву на своїх сторінках, ви можете використовувати динамічну.

> `pages/profile/[name].js`

```js
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const { name } = router.query;

  return <h1>Профіль користувача: {name}</h1>;
}
```
> У Next.js, якщо ти створюєш файл з дужками, наприклад:
> `pages/profile/[name].js`
> — це автоматично створює динамічний маршрут, де [name] — це параметр з URL.

пояснення:

- useRouter() — хук від Next.js, який дає доступ до router.query
- router.query.name — це значення з URL: /profile/NAME
- Рендеринг — коли сторінка завантажується, компонент читає name і показує його на сторінці

### what's next? -- Look for TASKS.md