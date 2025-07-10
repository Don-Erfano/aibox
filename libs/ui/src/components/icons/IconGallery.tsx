'use client';

import { FC, ComponentType } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import {
  ChevronIcon,
  TrashIcon,
  LaunchIcon,
  AddIcon,
  DeleteIcon,
  PauseIcon,
  MenuIcon,
  FileCopyIcon,
  RefreshIcon,
  CheckIcon,
  BookmarkIcon,
  EditIcon,
  AiBoxTextIcon,
  AiBoxIcon,
  PersonIcon,
  AdminIcon,
  QuestionIcon,
  HintIcon,
  PendingIcon,
  FailedIcon,
  ErrorIcon,
  SuccessIcon,
  DepositIcon,
  WithdrawIcon,
  SecondNoDataIcon,
} from './index';

type IconEntry = {
  Component: ComponentType;
  name: string;
};

const IconGallery: FC = () => {
  const copyToClipboard = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert(`Item ${text} has been copied!`);
        })
        .catch(() => {
          alert('Copy failed, please try again.');
        });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        alert(`Item ${text} has been copied!`);
      } catch {
        alert('Copy failed, please try again.');
      }
      document.body.removeChild(textArea);
    }
  };

  const icons: IconEntry[] = [
    { Component: ChevronDownIcon, name: 'ChevronDownIcon' },
    { Component: ChevronIcon, name: 'ChevronIcon' },
    { Component: TrashIcon, name: 'TrashIcon' },
    { Component: EditIcon, name: 'EditIcon' },
    { Component: LaunchIcon, name: 'LaunchIcon' },
    { Component: AddIcon, name: 'AddIcon' },
    { Component: DeleteIcon, name: 'DeleteIcon' },
    { Component: PauseIcon, name: 'PauseIcon' },
    { Component: MenuIcon, name: 'MenuIcon' },
    { Component: RefreshIcon, name: 'RefreshIcon' },
    { Component: CheckIcon, name: 'CheckIcon' },
    { Component: BookmarkIcon, name: 'BookmarkIcon' },
    { Component: FileCopyIcon, name: 'FileCopyIcon' },
    { Component: AiBoxTextIcon, name: 'AiBoxTextIcon' },
    { Component: AiBoxIcon, name: 'AIBoxIcon' },
    { Component: PersonIcon, name: 'PersonIcon' },
    { Component: AdminIcon, name: 'AdminIcon' },
    { Component: QuestionIcon, name: 'QuestionIcon' },
    { Component: HintIcon, name: 'HintIcon' },
    { Component: PendingIcon, name: 'PendingIcon' },
    { Component: FailedIcon, name: 'FailedIcon' },
    { Component: ErrorIcon, name: 'ErrorIcon' },
    { Component: SuccessIcon, name: 'SuccessIcon' },
    { Component: DepositIcon, name: 'DepositIcon' },
    { Component: WithdrawIcon, name: 'WithdrawIcon' },
    { Component: SecondNoDataIcon, name: 'SecondNoDataIcon' },
  ];

  return (
    <div className="flex flex-wrap gap-3 text-white-100">
      {icons.map(({ Component, name }) => (
        <div
          key={name}
          className="flex items-center justify-between gap-3 border-[1px] border-black rounded-xl p-2 hover:bg-green-700 transition-all cursor-pointer duration-500"
          onClick={() => copyToClipboard(`<${name} />`)}
        >
          <Component />
          <p className="text-white-100">{name}</p>
        </div>
      ))}
    </div>
  );
};

export default IconGallery;
