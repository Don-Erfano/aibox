export interface InteractiveTerminalProps {
  title?: string;
  onCommandSubmit?: (
    command: string,
  ) =>
    | Promise<string | string[] | { result: string } | any>
    | string
    | string[]
    | { result: string }
    | any;
}
