import { useRouter } from 'next/router';

export default function Checkout() {
  const router = useRouter();
  const { pizza } = router.query;

  return <h1>Ви замовили піцу: {pizza || 'немає даних'}</h1>;
}
