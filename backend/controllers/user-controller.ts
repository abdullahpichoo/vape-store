import bcrypt from "bcryptjs";

import User from "@/backend/models/user";
import {
  FAILED_TO_CREATE_CART,
  FAILED_TO_CREATE_USER,
  FAILED_TO_FETCH_USERS,
  FAILED_TO_UPDATE_USER,
  USER_NOT_FOUND,
} from "@/contants/errorMsgs";
import { Pagination } from "@/types";
import { UserType } from "@/types/api/user";

import { createCart } from "./cart-controller";

export async function getAllUsers(): Promise<UserType[]> {
  try {
    return await User.find({});
  } catch (error) {
    throw new Error(FAILED_TO_FETCH_USERS as string);
  }
}

export async function getPaginatedUsers(params: URLSearchParams): Promise<{
  users: UserType[];
  pagination: Pagination;
}> {
  const page = parseInt(params.get("pageNumber") || "1");
  const limit = parseInt(params.get("pageSize") || "10");
  const sortBy = params.get("sortBy") || "createdAt";
  const orderBy = params.get("orderBy") || "desc";
  const searchBy = params.get("searchBy") || "";
  const search = params.get("search") || "";

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await User.countDocuments();

  const pagination: Pagination = {
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    nextPage: 0,
    prevPage: 0,
  };

  if (endIndex < total) {
    pagination.nextPage = page + 1;
  }

  if (startIndex > 0) {
    pagination.prevPage = page - 1;
  }

  const searchRegex = new RegExp(search, "i");
  try {
    let users = [];
    if (search.length > 0 && searchBy.length > 0) {
      const query: Record<string, any> = {
        $or: [],
      };

      if (searchBy === "email") {
        query.$or.push({ email: { $regex: searchRegex } });
      } else if (searchBy === "username") {
        query.$or.push({ username: { $regex: searchRegex } });
      }
      users = await User.find(query)
        .sort({ [sortBy]: orderBy === "desc" ? -1 : 1 })
        .skip(startIndex)
        .limit(limit)
        .exec();
    } else {
      users = await User.find()
        .sort({ [sortBy]: orderBy === "desc" ? -1 : 1 })
        .skip(startIndex)
        .limit(limit);
    }
    return {
      users,
      pagination,
    };
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
    const { password } = data;
    const hashedPassword = await bcrypt.hash(password, 12);
    data.password = hashedPassword;

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
