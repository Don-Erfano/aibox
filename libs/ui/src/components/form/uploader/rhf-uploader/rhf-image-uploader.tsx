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

const RHFImageUploader = <TFieldValues extends FieldValues>(
  props: RHFImageUploaderProps<TFieldValues>
) => {
  const { name, control, label, description, onSubmitUpload, ...rest } = props;

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem className="pointer-events-none">
            {label && (
              <FormLabel className="pointer-events-auto">{label}</FormLabel>
            )}
            <FormControl>
              <div className="pointer-events-auto">
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
              </div>
            </FormControl>
            {!error && description && (
              <FormDescription>{description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default RHFImageUploader;
