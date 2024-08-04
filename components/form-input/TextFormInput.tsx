import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input'

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  className?: string;
  description?: string;
};
export default function TextFormInput({name, label, className, description, ...rest} : TextInputProps) {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name as string}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel >
          <Input className={`${className}`} {...rest } {...field} />
          <FormDescription>{description}</FormDescription>
          <FormMessage/>
        </FormItem>
      )}
    />
  );
}
