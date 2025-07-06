'use client';

import { useParams } from 'next/navigation';

import { CollectionTab } from '@/components/pages/collection';

const CollectionEditPage = () => {
  const params = useParams();
  const collectionId = params.id as string;

  return <CollectionTab collectionId={collectionId} />;
};

export default CollectionEditPage;
