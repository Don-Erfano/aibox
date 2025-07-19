export type CustomMessageValues = string[];

export interface CustomMessageProps {
  value?: CustomMessageValues;
  onChange?: (values: CustomMessageValues) => void;
}
