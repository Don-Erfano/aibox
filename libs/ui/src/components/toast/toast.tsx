import {
  ToastContainer as ToastifyToastContainer,
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
    toastClassName={() => 'overflow-hidden shadow-none mb-3'}
    rtl
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
