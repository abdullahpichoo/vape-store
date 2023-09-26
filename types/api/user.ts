import { Response } from "..";

export type UserPayloadType = Response<UserType>;

export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}
