"use client"
import { format } from "date-fns"
import { FieldValues, Control, Path } from 'react-hook-form';
import {DatePicker} from "@heroui/date-picker";
import {
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

 
type FieldProps<T extends FieldValues> = {
    form: {
      control: Control<T>;
    };
    name: Path<T>;
    label: string;
    placeholder: string;
};
 
export default function DatePickerField<T extends FieldValues>({ form, name, label, placeholder }: FieldProps<T>) { 
  
  const formateDate = (date) => {
    const nativeDate = new Date(date.year, date.month - 1, date.day);
    // Aplicar el formato deseado
    const formattedDate = format(nativeDate, "yyyy-MM-dd");
    return formattedDate;
  }
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem >
          <DatePicker                       
              onChange={(date) => {
                field.onChange(formateDate(date));
              }}
              name={name}
              labelPlacement="outside"
              label={label}
              className='w-[12.5rem]'    
            />
          <FormMessage className="form-message mt-2"/>
        </FormItem>
      )}
    />
  )
}