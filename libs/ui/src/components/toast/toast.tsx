import {
  ToastContainer as ToastifyToastContainer,
  cssTransition,
  toast as toastifyToast,
} from 'react-toastify';

import { CustomToast } from './custom-toast';
import { CustomToastOptions, ToastTypes } from './interface';

const createToast =
  (type: ToastTypes) =>
  (message: string, options: CustomToastOptions = {}) => {
    toastifyToast[type](
      <CustomToast message={message} type={type} options={options} />,
      { ...options }
    );
  };

const ToastContainer = () => (
  <ToastifyToastContainer
    position="top-left"
    hideProgressBar
    closeButton={false}
    icon={false}
    rtl
    transition={cssTransition({
      enter: 'animate-slide-in',
      exit: 'animate-slide-out',
    })}
    style={{ top: 24, left: 36 }}
    toastClassName={() =>
      'rounded-sm overflow-hidden mb-3 shadow-[0_2px_12px_0_#0000003D] min-w-[320px] sm:min-w-[344px] max-w-[500px] w-fit min-h-12'
    }
  />
);

const toast = {
  success: createToast('success'),
  info: createToast('info'),
  warning: createToast('warning'),
  error: createToast('error'),
  loading: createToast('loading'),
};

export { ToastContainer, toast };
