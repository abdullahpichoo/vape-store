"use client";

import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface InputControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  type: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  error?: FieldError;
  rules?: RegisterOptions;
}

const InputController = <T extends FieldValues>({
  name,
  control,
  type,
  label,
  placeholder,
  defaultValue,
  error,
  rules,
}: InputControllerProps<T>) => {
  return (
    <div className="form-item flex flex-col">
      <label
        htmlFor={name}
        className="font-semibold mb-2 ms-1 text-[1.6rem] md:text-[1.8rem]"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            className="px-8 py-4 rounded-xl text-[1.4rem] md:text-[1.6rem]"
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...field}
          />
        )}
        rules={rules}
      />
      {error != null && (
        <p className="px-2 py-1 text-[1.2rem] text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default InputController;
