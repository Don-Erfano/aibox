'use client';
import { FC } from 'react';
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
} from './index';

const IconGallery: FC = () => {
  const copyToClipboard = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert(`Item ${text} has been copied!`);
        })
        .catch((err) => {
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
  const icons = [
    ChevronIcon,
    LaunchIcon,
    TrashIcon,
    AddIcon,
    DeleteIcon,
    PauseIcon,
    MenuIcon,
    FileCopyIcon,
    RefreshIcon,
    CheckIcon,
    BookmarkIcon,
    EditIcon,
  ];

  return (
    <div className="flex flex-wrap gap-3 text-white-100">
      {icons.map((Component) => (
        <div
          key={Component.name}
          className="flex items-center justify-between gap-3 border-[1px] border-black rounded-xl p-2 hover:bg-green-700 transition-all cursor-pointer duration-500"
          onClick={() => copyToClipboard(`<${Component.name} />`)}
        >
          <Component />
          <p className="text-white-100">{Component.name}</p>
        </div>
      ))}
    </div>
  );
};

export default IconGallery;
