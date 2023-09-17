import { Response } from "..";

export type UserPayloadType = Response<UserType>;

interface UserType {
  email: string;
  password: string;
  role: string;
}
