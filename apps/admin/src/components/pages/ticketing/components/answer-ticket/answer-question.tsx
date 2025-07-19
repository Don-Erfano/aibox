import { FC } from 'react';
import { AnswerQuestionProps } from './interface';
import { strings } from '@/constant';

const AnswerQuestion: FC<AnswerQuestionProps> = ({ items, children }) => {
  return (
    <div className="max-w-[1376px] xl:mx-25 md:mx-15 mt-12 flex-col">
      <p className="bg-gray-200 text-start text-sm font-normal items-center px-4 py-2.5 rounded-[4px]">
        {strings.answerQuestions}
      </p>
      <div className="h-auto w-full px-4">
        {items.map((item) => (
          <div key={item.id} className="my-6">
            <p className="text-sm font-normal pb-4 text-slate-950">
              {item.title}
            </p>
            <div className="px-2">{children(item)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerQuestion;
