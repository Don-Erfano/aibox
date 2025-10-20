export interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  commands?: React.ReactNode;
  onRefresh?: () => void;
}
