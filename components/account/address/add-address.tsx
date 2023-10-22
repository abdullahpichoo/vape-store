"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/btn";
import InputController from "@/components/ui/form/input-controller";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/toast/use-toast";
import { useCreateAddress } from "@/helpers/queries/account/address/mutate";
import { AddressFormValues, AddressSchema } from "@/types/api/address";

interface AddAddressProps {
  userId: string;
  closeDialog: () => void;
}

const AddAddress = (props: AddAddressProps) => {
  const { userId, closeDialog } = props;
  const { toast } = useToast();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<AddressFormValues>({
    defaultValues: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      phoneNo: "",
    },
    mode: "onBlur",
    resolver: yupResolver(AddressSchema),
  });

  const {
    mutate: createAddress,
    isLoading: isCreating,
    error,
  } = useCreateAddress(
    userId,
    () => {
      toast({
        title: "Address Created Successfully!",
        description: "Address has been added successfully!",
      });
      reset();
      closeDialog();
    },
    () => {
      toast({
        title: "Failed to Create Address!",
        description: "Failed to add address!",
        variant: "destructive",
      });
    }
  );

  const onSubmit = async (data: AddressFormValues) => {
    await createAddress(data);
  };

  return (
    <>
      <form
        className="grid grid-cols-4 w-full gap-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-4">
          <InputController
            control={control}
            label="Street"
            name="street"
            type="text"
            placeholder="Enter your street address"
            rules={{
              required: "Please enter your street address",
            }}
            error={errors.street}
          />
        </div>
        <div className="col-span-2">
          <InputController
            control={control}
            label="City"
            name="city"
            type="text"
            placeholder="Enter your city name"
            rules={{
              required: "Please enter your city name",
            }}
            error={errors.city}
          />
        </div>
        <div className="col-span-2">
          <InputController
            control={control}
            label="State"
            name="state"
            type="text"
            placeholder="Enter your state"
            rules={{
              required: "Please enter your state",
            }}
            error={errors.state}
          />
        </div>

        <div className="col-span-2">
          <InputController
            control={control}
            label="Zip Code"
            name="zipCode"
            type="text"
            placeholder="Enter your zip code"
            rules={{
              required: "Please enter your zip code",
            }}
            error={errors.zipCode}
          />
        </div>
        <div className="col-span-2">
          <InputController
            control={control}
            label="Phone Number"
            name="phoneNo"
            type="text"
            placeholder="Enter your phone number"
            rules={{
              required: "Please enter your phone number",
            }}
            error={errors.phoneNo}
          />
        </div>
        <div className="col-span-4">
          <InputController
            control={control}
            label="Country"
            name="country"
            type="text"
            placeholder="Enter your country"
            rules={{
              required: "Please enter your country name",
            }}
            error={errors.country}
          />
        </div>
        <div className="text-center w-full my-10">
          <Button
            disabled={isCreating || !isDirty || !isValid}
            size="sm"
            variant="black"
          >
            <div className="flex items-center justify-center gap-4">
              {isCreating && <Spinner size="sm" color="black" />}
              <span>{isCreating ? "Adding..." : "Add Address"}</span>
            </div>
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddAddress;
