import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const { name } = router.query;

  return <h1>Профіль користувача: {name}</h1>;
}
