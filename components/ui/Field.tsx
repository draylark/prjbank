import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldValues, Control, Path } from 'react-hook-form';
import React from 'react';

type FieldProps<T extends FieldValues> = {
    form: {
      control: Control<T>;
    };
    name: Path<T>;
    label: string;
    placeholder: string;
};
  
const Field = <T extends FieldValues>({ form, name, label, placeholder }: FieldProps<T>) => {
  return (
    <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <div className='form-item'>
                <FormLabel className='form-label'>
                    {label}
                </FormLabel>
                <div className="flex w-full flex-col">
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            className='input-class'
                            type={name === 'password' ? 'password' : 'text'}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage className='form-message mt-2'/>
                </div>
            </div>
        )}
    />
  );
};

export default Field;