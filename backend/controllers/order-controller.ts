import {
  FAILED_TO_CREATE_ORDER,
  FAILED_TO_FETCH_ORDERS,
  FAILED_TO_UPDATE_ORDER,
  ORDER_NOT_FOUND,
} from "@/contants/errorMsgs";
import { Pagination, SearchParams } from "@/types";
import { OrderType } from "@/types/api/order";

import Cart from "../models/cart";
import Order from "../models/order";
import Product from "../models/product";

export const getAllOrders = async (
  params: SearchParams
): Promise<{
  orders: OrderType[];
  pagination: Pagination;
}> => {
  const page = parseInt(params.pageNumber || "1");
  const limit = parseInt(params.pageSize || "10");
  const sortBy = params.sortBy || "createdAt";
  const orderBy = params.orderBy || "desc";
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Order.countDocuments();

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

  try {
    const orders = await Order.find()
      .sort({ [sortBy]: orderBy === "desc" ? -1 : 1 })
      .skip(startIndex)
      .limit(limit);
    return {
      orders,
      pagination,
    };
  } catch (err) {
    throw new Error(FAILED_TO_FETCH_ORDERS + err);
  }
};

export const getAllOrdersServer = async (
  params: URLSearchParams
): Promise<{
  orders: OrderType[];
  pagination: Pagination;
}> => {
  const page = parseInt(params.get("pageNumber") || "1");
  const limit = parseInt(params.get("pageSize") || "10");
  const sortBy = params.get("sortBy") || "createdAt";
  const orderBy = params.get("orderBy") || "desc";
  const searchBy = params.get("searchBy") || "";

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Order.countDocuments();

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

  const searchRegex = new RegExp(searchBy, "i");
  console.log("search", searchRegex);
  try {
    let orders = [];
    if (searchBy.length > 0) {
      orders = await Order.find({
        $or: [{ "user.email": { $regex: searchRegex } }],
      })
        .sort({ [sortBy]: orderBy === "desc" ? -1 : 1 })
        .skip(startIndex)
        .limit(limit)
        .exec();
    } else {
      orders = await Order.find()
        .sort({ [sortBy]: orderBy === "desc" ? -1 : 1 })
        .skip(startIndex)
        .limit(limit);
    }

    return {
      orders,
      pagination,
    };
  } catch (err) {
    throw new Error(FAILED_TO_FETCH_ORDERS + err);
  }
};

export const getOrderById = async (id: string): Promise<OrderType> => {
  try {
    const order = await Order.findById(id);
    return order;
  } catch (err) {
    throw new Error(ORDER_NOT_FOUND + err);
  }
};

export const getOrdersByUserId = async (
  userId: string
): Promise<OrderType[]> => {
  try {
    const orders = await Order.find({ "user.userId": userId });

    return orders;
  } catch (err) {
    throw new Error(FAILED_TO_FETCH_ORDERS + err);
  }
};

export const createOrder = async (data: OrderType): Promise<OrderType> => {
  try {
    const order = (await Order.create(data)) as OrderType;

    const { items } = order;
    items.map(async (item) => {
      const { productId, quantity } = item;
      const productToUpdate = await Product.findById(productId);
      if (productToUpdate) {
        productToUpdate.countInStock -= quantity;
        await productToUpdate.save();
      }
    });

    await Cart.findOneAndUpdate({ userId: data.user.userId }, { items: [] });

    return order;
  } catch (err) {
    throw new Error(FAILED_TO_CREATE_ORDER + err);
  }
};

export const updateOrder = async (
  id: string,
  data: OrderType
): Promise<OrderType> => {
  try {
    const order = await Order.findByIdAndUpdate(id, data, { new: true });
    if (!order) {
      throw new Error(ORDER_NOT_FOUND as string);
    }
    return order;
  } catch (err) {
    throw new Error(FAILED_TO_UPDATE_ORDER + err);
  }
};
