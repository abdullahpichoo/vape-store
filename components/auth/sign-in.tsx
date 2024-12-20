"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { SignInFormValues } from "@/types/client/auth";
import { SignInSchema } from "@/types/client/auth";

import Button from "../ui/btn";
import InputController from "../ui/form/input-controller";
import Spinner from "../ui/spinner";
import { useToast } from "../ui/toast/use-toast";

const SignInCard = () => {
  const { toast } = useToast();
  const [signingIn, setSigningIn] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = async (data: SignInFormValues) => {
    setSigningIn(true);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setSigningIn(false);

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Failed to Sign In",
        description: result.error,
      });
    } else {
      window.location.replace("/");
    }
  };

  return (
    <div className="signin-card px-10 py-8 bg-slate-100 border w-full md:w-[70%] rounded-xl drop-shadow">
      <h1 className="text-center uppercase">Sign In</h1>

      <form
        className="flex flex-col w-full gap-4 md:px-24"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputController
          control={control}
          label="Email"
          name="email"
          type="text"
          placeholder="Enter your email address"
          rules={{
            required: "Please enter your email address",
          }}
          error={errors.email}
        />

        <InputController
          control={control}
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          rules={{
            required: "Please enter your password",
          }}
          error={errors.password}
        />
        <div className="text-center my-5">
          <Button disabled={signingIn} size="md" variant="orange">
            <div className="flex items-center justify-center gap-4">
              {signingIn && <Spinner size="sm" color="black" />}
              <span>{signingIn ? "Signing In..." : "Sign In"}</span>
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInCard;
