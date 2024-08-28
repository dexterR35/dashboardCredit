import { toast } from 'react-toastify';

export const useToast = () => {
  const success = (message) => {
    toast.success(message, { position: toast.POSITION.TOP_RIGHT });
  };

  const error = (message) => {
    toast.error(message, { position: toast.POSITION.TOP_RIGHT });
  };

  const info = (message) => {
    toast.info(message, { position: toast.POSITION.TOP_RIGHT });
  };

  const warning = (message) => {
    toast.warning(message, { position: toast.POSITION.TOP_RIGHT });
  };

  return {
    success,
    error,
    info,
    warning,
  };
};
