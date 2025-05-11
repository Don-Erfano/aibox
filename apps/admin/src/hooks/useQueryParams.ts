import { useSearchParams } from 'next/navigation';

export const useQueryParams = () => {
  const searchParams = useSearchParams();

  return Object.fromEntries(
    Array.from(searchParams.entries()).filter(([key]) => key !== 'index')
  );
};
