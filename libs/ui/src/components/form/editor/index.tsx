'use client';

import { Controller, FieldValues } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { EditorProps } from './interface';
import 'react-quill-new/dist/quill.snow.css';

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
}: EditorProps<TFieldValues>) => {
  return (
    <div>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <>
              <ReactQuill
                theme="snow"
                {...field}
                modules={modules}
                placeholder={placeholder}
                style={{
                  height,
                }}
              />
              {fieldState.error?.message && (
                <p className="text-xs font-light text-red-600 text-right mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
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
    </div>
  );
};
