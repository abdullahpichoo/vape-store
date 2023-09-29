import bcrypt from "bcryptjs";

import User from "@/backend/models/user";
import {
  FAILED_TO_CREATE_CART,
  FAILED_TO_CREATE_USER,
  FAILED_TO_FETCH_USERS,
  FAILED_TO_UPDATE_USER,
  USER_NOT_FOUND,
} from "@/contants/errorMsgs";
import { UserType } from "@/types/api/user";

import { createCart } from "./cart-controller";

// GET api/admin/users
export async function getAllUsers(): Promise<UserType[]> {
  try {
    return await User.find({});
  } catch (error) {
    throw new Error(FAILED_TO_FETCH_USERS as string);
  }
}

// GET api/admin/users/:id
export async function getUserById(id: string): Promise<UserType> {
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
export async function updateUser(
  id: string,
  data: UserType
): Promise<UserType> {
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

// POST api/admin/users/new
export async function createUser(data: UserType): Promise<UserType> {
  try {
    const { password } = data;
    const hashedPassword = await bcrypt.hash(password, 12);
    data.password = hashedPassword;

    const user = (await User.create(data)) as UserType;

    try {
      const cart = await createCart(user._id);
      user.cartId = cart._id;
    } catch (err) {
      throw new Error(FAILED_TO_CREATE_CART as string);
    }
    return user;
  } catch (error) {
    throw new Error(FAILED_TO_CREATE_USER as string);
  }
}
