import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

const FileUploadController = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  rules,
}: {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: FieldError;
  rules?: RegisterOptions;
}) => {
  return (
    <div className="form-item flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-semibold text-neutral-600 ms-1 text-[1.2rem] md:text-[1.6rem]"
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="file"
            onChange={(e) => {
              const files = e.target.files;
              field.onChange(files);
            }}
            multiple
            accept="image/png, image/jpeg, image/jpg, image/webp"
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

export default FileUploadController;
