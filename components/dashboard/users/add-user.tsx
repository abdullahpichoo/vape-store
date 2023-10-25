"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/btn";
import InputController from "@/components/ui/form/input-controller";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/toast/use-toast";
import { FAILED_TO_CREATE_USER } from "@/contants/errorMsgs";
import { USER_CREATED_SUCCESSFULLY } from "@/contants/successMsgs";
import { usersTag } from "@/contants/tags";
import { queryClient } from "@/lib/react-query";
import { addUserApiRoute } from "@/routes/api";
import { UserFormValues, UserSchema } from "@/types/api/user";
import { generateRandomPassword } from "@/utils/client";

interface AddUserProps {
  closeDialog: () => void;
}

const AddUser = (props: AddUserProps) => {
  const [isAdding, setIsAdding] = useState(false);

  const { toast } = useToast();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<UserFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(UserSchema),
  });

  const onSubmit = async (data: UserFormValues) => {
    if (!isDirty || !isValid) return;

    setIsAdding(true);

    try {
      const res = await fetch(addUserApiRoute, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = await res.json();
        throw new Error(payload.body.message);
      }

      queryClient.invalidateQueries([usersTag]);
      toast({
        title: USER_CREATED_SUCCESSFULLY,
        description: `User has been added successfully!`,
      });
      reset();
      props.closeDialog();
    } catch (err) {
      console.log("error", err);
      toast({
        title: FAILED_TO_CREATE_USER,
        description: `The user you requested could not be created. ${
          err as string
        }`,
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12">
            <InputController
              type="text"
              placeholder="Enter a Username"
              control={control}
              name="username"
              label="Username"
              error={errors.username}
              rules={{ required: "Please enter a username for your user!" }}
            />
          </div>
          <div className="col-span-12">
            <InputController
              type="email"
              placeholder="Enter an Email Address"
              control={control}
              name="email"
              label="Email"
              error={errors.email}
              rules={{ required: "Please enter an email for your user!" }}
            />
          </div>
          <div className="col-span-12">
            <InputController
              type="text"
              placeholder="Enter a Password"
              control={control}
              name="password"
              label="Password"
              error={errors.password}
              rules={{ required: "Please enter a password for your user!" }}
            />
            <p className="px-2 text-[1.2rem] font-medium text-gray-500">
              Please save this password somewhere safe and share it with your
              user.
            </p>
            <div className="text-right my-2">
              <Button
                variant="orange"
                size="sm"
                onClick={() => {
                  const pass = generateRandomPassword();
                  setValue("password", pass, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                Generate
              </Button>
            </div>
          </div>
        </div>
        <div className="my-10 text-center">
          <Button
            type="submit"
            variant="black"
            size="sm"
            disabled={isAdding || !isDirty || !isValid}
          >
            <div className="flex items-center justify-center gap-4">
              {isAdding && <Spinner size="sm" color="black" />}

              {isAdding ? "Adding" : "Add User"}
            </div>
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddUser;
