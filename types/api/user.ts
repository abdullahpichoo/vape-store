import { Response } from "..";

export type UserPayloadType = Response<UserType>;

export interface UserType {
  email: string;
  password: string;
  role: string;
}
