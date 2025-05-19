import { useQueryState } from 'nuqs';

import { TabProps } from './types';
import {
  TabTitle,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './components';
import { useEffect, useRef } from 'react';

const Tab: React.FC<TabProps> = ({ tabs }) => {
  const [tabId, setTabId] = useQueryState('tab');

  const enabledTabs = tabs.filter((tab) => !tab.isDisabled);
  const isValidTab = enabledTabs.some((tab) => tab.id === tabId);

  const lastValidTabRef = useRef<string>(enabledTabs[0]?.id);

  useEffect(() => {
    if (isValidTab && tabId) {
      lastValidTabRef.current = tabId;
    } else if (tabId && !isValidTab) {
      setTabId(lastValidTabRef.current);
    }
  }, [tabId, isValidTab, setTabId]);

  const currentTabId =
    (isValidTab ? tabId : lastValidTabRef.current) ?? undefined;

  return (
    <Tabs
      value={currentTabId}
      onValueChange={(val) => {
        const selectedTab = tabs.find((tab) => tab.id === val);
        if (!selectedTab?.isDisabled) {
          setTabId(val);
        }
      }}
    >
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
