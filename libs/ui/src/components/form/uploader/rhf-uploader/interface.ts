import { Control, FieldValues, Path } from 'react-hook-form';
import { AibImageUploaderProps } from '../aib-image-uploader';

export interface RHFImageUploaderProps<TFieldValues extends FieldValues>
  extends Omit<
    AibImageUploaderProps,
    'initialImageUrl' | 'onFileChange' | 'error' | 'errorMessage'
  > {
  control?: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  description?: string;
  onSubmitUpload?: (file: File | File[]) => void;
}
