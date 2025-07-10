'use client';

import { FieldValues } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { EditorProps } from './interface';
import 'react-quill-new/dist/quill.snow.css';
import styles from './styles.module.css';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
});

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
      ['clean'],
    ],
  },
};

export const Editor = <TFieldValues extends FieldValues>({
  control,
  name,
  height = '140px',
  value,
  onChange,
  error,
  placeholder,
  label,
}: EditorProps<TFieldValues>) => {
  return (
    <>
      {control ? (
        <FormField
          name={name}
          control={control}
          render={({ field }) => (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <div className={styles.wrapper}>
                  <ReactQuill
                    theme="snow"
                    {...field}
                    modules={modules}
                    placeholder={placeholder}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            placeholder={placeholder}
            style={{ height }}
          />
          {error && (
            <p className="text-xs font-light text-red-600 text-right mt-1">
              {error}
            </p>
          )}
        </>
      )}
    </>
  );
};
