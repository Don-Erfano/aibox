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
  const { name, control, label, description, ...rest } = props;

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
              onFileChange={field.onChange}
              error={!!error}
              errorMessage={error?.message ?? ''}
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
