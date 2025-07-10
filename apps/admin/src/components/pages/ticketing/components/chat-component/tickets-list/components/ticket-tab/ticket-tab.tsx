import { FC, useState } from 'react';
import { TicketTabProps } from './interface';
import { strings } from '@/constant';

const TicketTab: FC<TicketTabProps> = ({
  ticketCounts,
  activeTab = 'all',
  onTabChange,
}) => {
  const [selectedTab, setSelectedTab] = useState(activeTab);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    onTabChange?.(tab);
  };

  const tabs = [
    { label: strings.all, count: ticketCounts.all, key: 'all' },
    {
      label: strings.assignedToMe,
      count: ticketCounts.assigned,
      key: 'assigned',
    },
    { label: strings.openTicket, count: ticketCounts.open, key: 'open' },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-xl z-10">
      <div className="flex items-center justify-between pt-4">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={` flex items-center gap-2 px-4 py-2 text-sm font-normal transition-colors cursor-pointer ${
              selectedTab === tab.key
                ? 'text-teal-700 border-b-2 border-teal-500'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <span className="whitespace-nowrap">{tab.label}</span>
            <span
              className={`min-w-4 minh-4 px-1 rounded-[3px] text-xs text-center ${
                selectedTab === tab.key
                  ? 'bg-teal-100 text-teal-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketTab;
