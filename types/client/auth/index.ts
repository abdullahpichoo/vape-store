import * as yup from "yup";

export interface SignInFormValues {
  email: string;
  password: string;
}

export const SignInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(32).required(),
});
