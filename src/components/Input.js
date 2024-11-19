import { Controller, useFormContext } from "react-hook-form";

export default function Input({ name, label, type = "text", ...props }) {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <div className="flex flex-col w-full">
            <label htmlFor={name}> {label}</label>
            <input
              id={field.name}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              type={type}
              className="border-2 outline-none p-1"
              {...props}
            ></input>
            {fieldState.error && (
              <div className="text-red-400">{fieldState.error.message}</div>
            )}
          </div>
        );
      }}
    />
  );
}
