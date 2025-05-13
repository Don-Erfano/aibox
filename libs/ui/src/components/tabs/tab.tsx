'use client';

import { TabProps } from './types';
import { TabTitle } from './components/tab-title';
import { Tabs } from './components/tabs';
import { TabsList } from './components/tab-list';
import { TabsTrigger } from './components/tabs-trigger';
import { TabsContent } from './components/tabs-content';
import { useQueryState } from 'nuqs';

export default function Tab({ tabs }: TabProps) {
  const [tabId, setTabId] = useQueryState('tab');
  const defaultTabId = tabId || tabs[0].id;
  console.log(tabId);

  return (
    <Tabs defaultValue={defaultTabId} onValueChange={setTabId}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            disabled={tab.isDisabled}
            className={`${tab.isDisabled ? 'cursor-def' : 'cursor-pointer'} `}
          >
            <TabTitle
              className={`
                ${
                  tab.isDisabled
                    ? 'text-gray-400'
                    : 'hover:text-teal-600 text-gray-500'
                }`}
            >
              {tab.name}
            </TabTitle>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
