'use client';

import { Tab } from '@aibox/ui';

import { FormContainer } from '@/components/templates';
import { strings } from '@/constant';

import { CollectionInfoForm } from './collection-info-form';
import { SeoInfoForm } from './seo-info-form';

export const CollectionTab = ({ collectionId }: { collectionId?: string }) => {
  const isEdit = !!collectionId;

  const tabs = [
    {
      id: 'collection-info',
      name: strings.collectionInfo,
      content: <CollectionInfoForm collectionId={collectionId} />,
    },
    {
      id: 'seo-info',
      name: strings.seoInfo,
      content: <SeoInfoForm collectionId={collectionId} />,
    },
  ];

  return (
    <FormContainer
      title={
        isEdit
          ? `${strings.editCollection} - ${strings.collectionName}`
          : strings.addNewCollection
      }
    >
      <Tab tabs={tabs} />
    </FormContainer>
  );
};
