import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react';

import { LoadingRectangle, ToastTypeProps, ToastTypes } from './interface';

const loadingIconRectangles: LoadingRectangle[] = [
  { bgColor: 'bg-teal-600', delay: 'delay-[2000ms]' },
  { bgColor: 'bg-teal-600/50', delay: 'delay-[1000ms]' },
  { bgColor: 'bg-teal-600/12', delay: 'delay-[75ms]' },
];

export const toastTypesMap: Record<ToastTypes, ToastTypeProps> = {
  info: {
    icon: <Info className="fill-blue-500 text-white" />,
    progressBgColor: 'bg-blue-500',
  },
  success: {
    icon: <CircleCheck className="fill-green-500 text-white" />,
    progressBgColor: 'bg-green-500',
  },
  error: {
    icon: <CircleX className="fill-red-700 text-white" />,
    progressBgColor: 'bg-red-700',
  },
  warning: {
    icon: <TriangleAlert className="fill-orange-500 text-white" />,
    progressBgColor: 'bg-orange-500',
  },
  loading: {
    icon: (
      <div className="flex items-center gap-1" data-testid="animation">
        {loadingIconRectangles.map(({ bgColor, delay }) => (
          <span
            className={`w-1.5 h-5 rounded-[1px] animate-loading ${delay} ${bgColor}`}
          />
        ))}
      </div>
    ),
  },
};
