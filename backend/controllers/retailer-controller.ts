import bcrypt from "bcryptjs";

import User from "@/backend/models/user";
import { UserType } from "@/types/api/user";
import {
  FAILED_TO_CREATE_USER,
  FAILED_TO_FETCH_USERS,
  FAILED_TO_UPDATE_USER,
  USER_NOT_FOUND,
} from "@/contants/errorMsgs";

// GET api/admin/retailers
export async function getAllUsers() {
  try {
    return await User.find({});
  } catch (error) {
    throw new Error(FAILED_TO_FETCH_USERS as string);
  }
}

// GET api/admin/retailers/:id
export async function getUserById(id: string) {
  try {
    const user = (await User.findById(id)) as UserType;
    if (!user) {
      throw new Error(USER_NOT_FOUND as string);
    }
    return user;
  } catch (error) {
    throw new Error(USER_NOT_FOUND as string);
  }
}

// PUT api/admin/retailers/:id
export async function updateUser(id: string, data: UserType) {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    if (!updatedUser) {
      throw new Error(USER_NOT_FOUND as string);
    }
    return updatedUser;
  } catch (error) {
    throw new Error(FAILED_TO_UPDATE_USER as string);
  }
}

// POST api/admin/retailers/new
export async function createUser(data: UserType) {
  try {
    const { password } = data;
    const hashedPassword = await bcrypt.hash(password, 12);
    data.password = hashedPassword;

    const user = await User.create(data);
    return user;
  } catch (error) {
    throw new Error(FAILED_TO_CREATE_USER as string);
  }
}
