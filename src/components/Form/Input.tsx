import { InputHTMLAttributes } from 'react';

import { Field } from 'formik';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputProps) => {
  return (
    <Field
      {...props}
      autoComplete='off'
      className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
    />
  );
};
