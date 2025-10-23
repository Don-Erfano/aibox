'use client';

import { FC } from 'react';

import { Tab, TableContainer } from '@aibox/ui';
import { strings } from '@/constant';

import Errorslist from './errors-list';
import ServersList from './servers-list';

const ServersTab: FC = () => (
  <TableContainer>
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
  </TableContainer>
);

export default ServersTab;
