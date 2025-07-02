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
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
      ['preview', 'edit'], // Added custom buttons
    ],
    handlers: {
      preview: function () {
        console.log('Preview clicked');
        // Add preview logic here
      },
      edit: function () {
        console.log('Edit clicked');
        // Add edit logic here
      },
    },
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
  const editorClassNames = `
    quill
    [&_.ql-toolbar]:ltr
    [&_.ql-container]:h-[${height}]
    [&_.ql-container]:rtl
    [&_.ql-editor]:text-right
    border
    rounded-md
    [&_.ql-toolbar]:justify-start // Align toolbar icons to the left
  `;

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
                className={editorClassNames}
              />
              {fieldState.error?.message && (
                <p className="text-sm font-medium text-destructive mt-1">
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
            className={editorClassNames}
          />
          {error && (
            <p className="text-sm font-medium text-destructive mt-1">{error}</p>
          )}
        </>
      )}
    </div>
  );
};
