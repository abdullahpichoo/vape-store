import * as yup from "yup";

export type AddressType = {
  _id?: string;
  street: string;
  city: string;
  state: string;
  phoneNo: string;
  zipCode: string;
  country: string;
  userId: string;
  createdAt: Date;
};

export type AddressFormValues = Omit<
  AddressType,
  "_id" | "createdAt" | "userId"
>;

export const AddressSchema = yup.object().shape({
  street: yup.string().required("Please enter your street name!"),
  city: yup.string().required("Please select your city!"),
  state: yup.string().required("Please select your state!"),
  phoneNo: yup.string().required("Please enter your phone number!"),
  zipCode: yup.string().required("Please enter your zip code!"),
  country: yup.string().required("Please select your country!"),
});
