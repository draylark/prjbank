import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldValues, Control, Path } from "react-hook-form";
import React, { useEffect, useState } from "react";

type FieldProps<T extends FieldValues> = {
  form: {
    control: Control<T>;
    setValue: (name: Path<T>, value: any) => void;
  };
  name: Path<T>;
  label: string;
  placeholder: string;
};

const Field = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
}: FieldProps<T>) => {
  const [ssn, setSsn] = useState("");
  const [state, setState] = useState("");

  const handleSsnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Solo números
    const formatted = value.slice(0, 9).replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3"); // Formato ###-##-####
    setSsn(formatted); // Actualiza el estado local con el valor formateado
    form.setValue(name, formatted); // Actualiza el valor formateado en react-hook-form
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 2); // Convierte a mayúsculas y limita a 2 caracteres
    setState(value)
    form.setValue(name, value); // Actualiza el valor en mayúsculas en react-hook-form
  };

  // Sincroniza el valor de react-hook-form con el estado local en caso de que cambie
  useEffect(() => {
    if (name === "ssn") {
      form.setValue(name, ssn);
    }
  }, [ssn, name, form]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              {name === "ssn" ? (
                <Input
                  placeholder="###-##-####"
                  className="input-class"
                  type="text"
                  maxLength={11} // Limita el máximo de caracteres
                  value={ssn} // Usa el valor formateado en el estado local
                  onChange={(e) => {
                    handleSsnChange(e);
                    field.onChange(e); // Actualiza el valor en el formulario
                  }}
                />
              ) : name === "state" ? (
                <Input
                  placeholder="State (e.g., NY)"
                  className="input-class"
                  type="text"
                  maxLength={2} // Limita a 2 caracteres
                  value={state}
                  onChange={(e) => {
                    handleStateChange(e); // Convierte a mayúsculas
                    field.onChange(e); // Actualiza el valor en el formulario
                  }}
                />
              ) : (
                <Input
                  placeholder={placeholder}
                  className="input-class"
                  type={name === "password" ? "password" : "text"}
                  {...field}
                />
              )}
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default Field;