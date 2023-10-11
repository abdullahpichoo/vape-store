import { FieldValues } from "react-hook-form";
import * as yup from "yup";

export interface SignInFormValues extends FieldValues {
  email: string;
  password: string;
}

export const SignInSchema = yup.object().shape({
  email: yup.string().email().required("Please enter your email address!"),
  password: yup.string().required("Please enter your password!"),
});
