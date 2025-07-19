'use client';

import type { TabProps } from './types';
import {
  TabTitle,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './components';

const Tab = ({ tabs }: TabProps) => {
  // const [rawTabId, setTabId] = useQueryState('tab');
  // let isValidTab = false;

  const enabledTabs: TabProps['tabs'] = tabs.filter((t) => {
    // if (t.id === tabId && !t.isDisabled) isValidTab = true;
    return !t.isDisabled;
  });

  const allTabsDisabled = enabledTabs.length === 0;

  // useEffect(() => {
  //   if (allTabsDisabled) return;
  //
  //   if (!tabId || !isValidTab) {
  //     setTabId(enabledTabs[0].id);
  //   }
  // }, [tabId, isValidTab, setTabId, allTabsDisabled]);

  // const currentTabId = isValidTab ? tabId : enabledTabs[0].id;

  if (allTabsDisabled) {
    return (
      <div className="p-4 text-center text-gray-500">
        هیچ تب فعالی وجود ندارد.
      </div>
    );
  }

  return (
    <Tabs
    // value={currentTabId}
    // onValueChange={(val) => {
    //   setTabId(val);
    // }}
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
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*@ts-ignore*/}
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Tab;
