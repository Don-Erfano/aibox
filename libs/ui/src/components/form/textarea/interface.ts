import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

type TTextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & { error?: boolean };

interface RHFTextareaProps<TFieldValues extends FieldValues>
  extends Omit<TTextareaProps, "name"> {
  control?: Control<TFieldValues>;
  name: Path<TFieldValues>;
  maxLength?: number;
  description?: string;
  label?: string;
}

export type { RHFTextareaProps, TTextareaProps };
