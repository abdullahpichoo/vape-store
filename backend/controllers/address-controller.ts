import Address from "@/backend/models/address";
import {
  FAILED_TO_CREATE_ADDRESS,
  FAILED_TO_DELETE_ADDRESS,
  FAILED_TO_GET_ADDRESSES,
  FAILED_TO_UPDATE_ADDRESS,
} from "@/contants/errorMsgs";
import { AddressType } from "@/types/api/address";

export const getAddresses = async (userId: string): Promise<AddressType[]> => {
  try {
    const addresses = (await Address.find({
      user: userId,
    })) as AddressType[];
    if (!addresses) {
      throw new Error(FAILED_TO_GET_ADDRESSES);
    }
    return addresses;
  } catch (err) {
    throw new Error(FAILED_TO_GET_ADDRESSES);
  }
};

export const createAddress = async (
  address: AddressType
): Promise<AddressType> => {
  try {
    const newAddress = (await Address.create(address)) as AddressType;
    return newAddress;
  } catch (err) {
    throw new Error(FAILED_TO_CREATE_ADDRESS);
  }
};

export const updateAddress = async (
  addressId: string,
  data: AddressType
): Promise<AddressType> => {
  try {
    const address = (await Address.findByIdAndUpdate(addressId, data, {
      new: true,
    })) as AddressType;
    if (!address) {
      throw new Error(FAILED_TO_UPDATE_ADDRESS);
    }
    return address;
  } catch (err) {
    throw new Error(FAILED_TO_UPDATE_ADDRESS);
  }
};

export const deleteAddress = async (
  addressId: string
): Promise<AddressType> => {
  try {
    return (await Address.findByIdAndDelete(addressId)) as AddressType;
  } catch (err) {
    throw new Error(FAILED_TO_DELETE_ADDRESS);
  }
};
