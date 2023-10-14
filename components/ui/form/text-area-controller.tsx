"use client";

import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface TextAreaControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  type: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  error?: FieldError;
  rules?: RegisterOptions;
}

const TextAreaController = <T extends FieldValues>({
  name,
  control,
  type,
  label,
  placeholder,
  defaultValue,
  error,
  rules,
}: TextAreaControllerProps<T>) => {
  return (
    <div className="form-item flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-semibold text-neutral-600 ms-1 text-[1.6rem] md:text-[1.8rem]"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <textarea
            id={name}
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

export default TextAreaController;
