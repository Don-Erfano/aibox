export interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh?: () => void;
  title?: string | React.ReactNode;
  commands?: React.ReactNode;
}
