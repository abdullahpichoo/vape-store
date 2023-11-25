"use client";

import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface SelectControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  type: string;
  label: string;
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
  multiple?: boolean;
  defaultValue?: string;
  error?: FieldError;
  rules?: RegisterOptions;
}

const SelectController = <T extends FieldValues>({
  name,
  control,
  type,
  label,
  placeholder,
  options,
  defaultValue,
  multiple,
  error,
  rules,
}: SelectControllerProps<T>) => {
  return (
    <div className="form-item flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-semibold text-neutral-600 ms-1 text-[1.2rem] md:text-[1.6rem]"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <select
            id={name}
            className="px-8 py-4 rounded-xl text-[1.4rem] md:text-[1.6rem] border border-neutral-200 focus:outline-orange-1"
            placeholder={placeholder}
            defaultValue={defaultValue}
            multiple={multiple}
            {...field}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        rules={rules}
      />
      {error != null && (
        <p className="px-2 py-1 text-[1.2rem] text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default SelectController;
