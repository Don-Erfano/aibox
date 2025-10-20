interface IMessageBox {
  variant?: "error" | "warning" | "success" | "info";
  size?: "fix" | "full";
  hasIcon?: boolean;
  message: string;
  className?: string;
}

export type { IMessageBox };
