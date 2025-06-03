import { ReactNode } from 'react';

export interface AnswerItem {
  id: string;
  title: string;
}

export interface AnswerQuestionProps {
  items: AnswerItem[];
  children: (item: AnswerItem) => ReactNode;
}
