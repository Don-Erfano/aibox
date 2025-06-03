import { useQueryState } from 'nuqs';
import { TabProps } from './types';
import {
  TabTitle,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './components';
import { useEffect } from 'react';

const Tab: React.FC<TabProps> = ({ tabs }) => {
  const [rawTabId, setTabId] = useQueryState('tab');
  const tabId = rawTabId ?? undefined; // no null allowed

  const enabledTabs: TabProps['tabs'] = [];
  let defaultTabId: string | undefined;
  let isValidTab = false;

  for (const tab of tabs) {
    if (!tab.isDisabled) {
      enabledTabs.push(tab);
      if (!defaultTabId) defaultTabId = tab.id;
      if (tab.id === tabId) isValidTab = true;
    }
  }

  const allTabsDisabled = enabledTabs.length === 0; // = defaultTabId === undefined

  useEffect(() => {
    if (allTabsDisabled) return;

    if (!tabId || !isValidTab) {
      defaultTabId && setTabId(defaultTabId);
    }
  }, [tabId, isValidTab, setTabId, defaultTabId, allTabsDisabled]);

  const currentTabId = allTabsDisabled
    ? undefined
    : isValidTab
    ? tabId
    : defaultTabId;

  if (allTabsDisabled) {
    return (
      <div className="p-4 text-center text-gray-500">
        هیچ تب فعالی وجود ندارد.
      </div>
    );
  }

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
