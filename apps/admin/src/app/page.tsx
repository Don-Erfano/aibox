import { Button } from '@aibox/ui';
import { services } from '@aibox/services';
import { theme } from '@aibox/theme';
import Link from 'next/link';
// import { useQuery } from '@/hooks/useQuery';

export default function Index() {
  console.log(services());
  console.log(theme());

  // const { data, isLoading, isError } = useQuery(() => services(), {
  //   onError(err) {
  //     alert(`failed to load services: ${(err as Error).message}`);
  //   },
  // });
  // if (isLoading) return <div>loading</div>;
  // if (isError) return <div>error loading services.</div>;
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div>
      <Link href="/dashboard">
        <Button variant="link">Dashboard</Button>
      </Link>
    </div>
  );
}
