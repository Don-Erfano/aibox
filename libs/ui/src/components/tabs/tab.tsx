import { useQueryState } from 'nuqs';

import { TabProps } from './types';
import {
  TabTitle,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './components';

const Tab: React.FC<TabProps> = ({ tabs }) => {
  const [tabId, setTabId] = useQueryState('tab');
  const defaultTabId = tabId || tabs[0].id;

  return (
    <Tabs defaultValue={defaultTabId} onValueChange={setTabId}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} disabled={tab.isDisabled}>
            <TabTitle disabled={tab.isDisabled}>{tab.name}</TabTitle>
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
};
export default Tab;
