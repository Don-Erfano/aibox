import { useState } from 'react';
import { EFilterValue, filterOptions } from './filter-options';
import { strings } from '@/constant';

const filterLabels: Record<string, string> = {
  weekly: strings.week,
  monthly: strings.month,
  yearly: strings.year,
};

const useCardFilter = () => {
  const [filter, setFilter] = useState<string>(EFilterValue.WEEKLY);
  const filterLabel = `در ${filterLabels[filter]} گذشته`;

  const handleOptionClick = (optionValue: string) => {
    setFilter(optionValue);
  };
  return {
    filterLabel,
    handleOptionClick,
    filter,
    selectedOption: filter,
    options: filterOptions,
    hasMoreOptions: true,
  };
};

export default useCardFilter;
