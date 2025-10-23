interface IExitModalProps {
  id: {
    profile: string;
    user_id: string;
    email: string;
  };
  handleClose: () => void;
}

interface IDownServerModal {
  id: {
    email: string;
    user_id: string;
  };
  handleClose: () => void;
}

export type { IExitModalProps, IDownServerModal };
