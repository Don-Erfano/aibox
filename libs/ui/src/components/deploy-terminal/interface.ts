export interface DeployTerminalProps {
  title?: string | React.ReactNode;
  commands?: React.ReactNode;
  onClose?: () => void;
  onRefresh?: () => void;
}
