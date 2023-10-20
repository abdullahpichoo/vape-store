import * as yup from "yup";

import { Response } from "..";

export type UserPayloadType = Response<UserType>;

export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  cartId: string;
  role: string;
}

export type UserFormValues = Omit<UserType, "_id" | "cartId" | "role">;

export const UserSchema = yup.object().shape({
  username: yup.string().required("Please enter a username for your user!"),
  email: yup
    .string()
    .email()
    .required("Please enter an email address for your user!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long!")
    .required("Please enter a password for your user!"),
});
