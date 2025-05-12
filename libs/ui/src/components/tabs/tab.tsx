import { TabProps } from './types';
import { TabTitle } from './components/tab-title';
import { Tabs } from './components/tabs';
import { TabsList } from './components/tab-list';
import { TabsTrigger } from './components/tabs-trigger';
import { TabsContent } from './components/tabs-content';

export default function Tab({ tabs }: TabProps) {
  return (
    <Tabs defaultValue={tabs[0].id}>
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
