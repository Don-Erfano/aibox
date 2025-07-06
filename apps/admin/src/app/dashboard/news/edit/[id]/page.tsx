import { EditNews } from '@/components/pages/news';

export default function EditNewsPage({ params }: { params: { id: string } }) {
  return <EditNews id={params.id} />;
}
