import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

import { Switch } from "../switch";

interface SwitchControllerProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  value?: boolean;
  error?: FieldError;
  rules?: RegisterOptions;
}

const SwitchController = <T extends FieldValues>({
  name,
  label,
  control,
  value,
  error,
  rules,
}: SwitchControllerProps<T>) => {
  return (
    <div className="form-item flex flex-col gap-3">
      <label
        htmlFor={name}
        className="font-semibold text-neutral-600 mb-2 ms-1 text-[1.4rem] md:text-[1.6rem]"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Switch checked={value} onCheckedChange={field.onChange} />
        )}
        rules={rules}
      />
      {error != null && (
        <p className="px-2 py-1 text-[1.2rem] text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default SwitchController;
