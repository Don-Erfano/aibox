import { CategoryPage } from '@/components/pages/ticketing';
import { Suspense } from 'react';

const Category = () => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>
    <CategoryPage />
  </Suspense>
);
export const dynamic = 'force-dynamic';

export default Category;
