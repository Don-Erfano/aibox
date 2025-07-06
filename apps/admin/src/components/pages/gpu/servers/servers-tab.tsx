'use client';

import { FC } from 'react';
import { Tab } from '@aibox/ui';
import ServersList from './servers-list';
import { strings } from '@/constant';
import Errorslist from './errors-list';

const ServersTab: FC = () => (
  <Tab
    tabs={[
      {
        content: <ServersList />,
        id: 'servers',
        name: strings.servers,
      },
      {
        content: <Errorslist />,
        id: 'errors',
        name: strings.errors,
      },
    ]}
  />
);

export default ServersTab;
