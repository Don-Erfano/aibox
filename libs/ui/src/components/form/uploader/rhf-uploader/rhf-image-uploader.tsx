import { FieldValues } from 'react-hook-form';
import { RHFImageUploaderProps } from './interface';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../form';
import { AibImageUploader } from '../aib-image-uploader';

export const RHFImageUploader = <TFieldValues extends FieldValues>(
  props: RHFImageUploaderProps<TFieldValues>
) => {
  const { name, control, label, description, onSubmitUpload, ...rest } = props;

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <AibImageUploader
              {...rest}
              initialImageUrl={field.value as string | string[]}
              error={!!error}
              onFileChange={async (file) => {
                field.onChange(file);

                if (file && onSubmitUpload) {
                  await onSubmitUpload(file);
                }
              }}
            />
          </FormControl>
          {!error && description && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFImageUploader;
