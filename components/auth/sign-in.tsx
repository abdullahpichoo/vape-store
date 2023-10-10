"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { SignInFormValues } from "@/types/client/auth";
import { useForm } from "react-hook-form";
import { SignInSchema } from "@/types/client/auth";
import Button from "../ui/btn";

const SignInCard = () => {
  const { register, handleSubmit } = useForm<SignInFormValues>({
    resolver: yupResolver(SignInSchema),
  });

  return (
    <div className="signin-card px-10 py-8 bg-slate-100 border w-[50%] rounded-xl drop-shadow">
      <h1 className="text-center uppercase">Sign In</h1>

      <form className="flex flex-col gap-4 px-24 text-[2rem]">
        <div className="form-item flex flex-col">
          <label htmlFor="email" className="font-semibold mb-2 ms-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            className="px-8 py-4 rounded-xl"
          />
        </div>
        <div className="form-item flex flex-col">
          <label htmlFor="password" className="font-semibold mb-2 ms-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="px-8 py-4 rounded-xl"
          />
        </div>

        <Button variant="orange">Sign In</Button>
      </form>
    </div>
  );
};

export default SignInCard;
