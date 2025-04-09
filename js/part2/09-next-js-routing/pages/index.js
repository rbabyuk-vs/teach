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