"use client"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FieldValues, Control, Path } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 

type FieldProps<T extends FieldValues> = {
    form: {
      control: Control<T>;
    };
    name: Path<T>;
    label: string;
    placeholder: string;
};
 
export default function DatePicker<T extends FieldValues>({ form, name, label, placeholder }: FieldProps<T>) { 
  return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="form-item">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[200px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                       format(field.value, "yyyy-MM-dd")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-950 border border-gray-300 shadow-lg text-white" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => {
                        field.onChange(format(date, "yyyy-MM-dd")); // Envía la fecha como string
                        }}
                        disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                    />
                </PopoverContent>
              </Popover>
              <FormMessage className="form-message mt-2"/>
            </FormItem>
          )}
        />
  )
}