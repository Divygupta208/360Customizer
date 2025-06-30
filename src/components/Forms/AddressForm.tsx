import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { Address } from "../../types/User";
import FormField from "./FormField";

export const addressSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(2, "Full name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),

  mobile: z
    .string({ required_error: "Mobile number is required" })
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[0-9]{10}$/, "Mobile number must contain only digits"),

  pincode: z
    .string({ required_error: "Pincode is required" })
    .regex(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit pincode"),

  localAddress: z
    .string({ required_error: "Local address is required" })
    .min(2, "Local address must be at least 2 characters"),

  street: z
    .string({ required_error: "Street is required" })
    .min(2, "Street must be at least 2 characters"),

  area: z
    .string({ required_error: "Area is required" })
    .min(2, "Area must be at least 2 characters"),

  landmark: z.string().optional(),

  city: z
    .string({ required_error: "City is required" })
    .min(2, "City must be at least 2 characters"),

  state: z
    .string({ required_error: "State is required" })
    .min(2, "State must be at least 2 characters"),

  country: z
    .string({ required_error: "Country is required" })
    .min(2, "Country must be at least 2 characters"),
});

type AddressFormInputs = z.infer<typeof addressSchema>;

const AddressFormModal = ({
  closeModal,
  existingAddress,
  onSave,
}: {
  closeModal: () => void;
  existingAddress?: Address;
  onSave: (address: Address) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormInputs>({
    mode: "onChange",
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (existingAddress) {
      reset({
        fullName: existingAddress.fullName,
        mobile: existingAddress.mobile,
        pincode: existingAddress.pincode,
        localAddress: existingAddress.localAddress,
        street: existingAddress.street,
        area: existingAddress.area,
        landmark: existingAddress.landmark,
        city: existingAddress.city,
        state: existingAddress.state,
        country: existingAddress.country,
      });
    }
  }, [existingAddress, reset]);

  const onSubmit = (data: AddressFormInputs) => {
    const newAddress: Address = {
      id: existingAddress?.id || Date.now(),
      ...data,
      landmark: data.landmark ?? "", // Ensure string
    };

    onSave(newAddress);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-start md:items-center p-4 overflow-y-auto ">
      <div className="bg-white absolute top-15 md:top-20 rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 md:p-6 space-y-4"
        >
          <h2 className="text-lg font-bold mb-4 text-center">
            {existingAddress ? "Edit Address" : "Add New Address"}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              registration={register("fullName")}
              error={errors.fullName}
            />
            <FormField
              label="Mobile"
              registration={register("mobile")}
              error={errors.mobile}
            />
            <FormField
              label="Pincode"
              registration={register("pincode")}
              error={errors.pincode}
            />
            <FormField
              label="Local Address"
              registration={register("localAddress")}
              error={errors.localAddress}
            />
            <FormField
              label="Street"
              registration={register("street")}
              error={errors.street}
            />
            <FormField
              label="Area"
              registration={register("area")}
              error={errors.area}
            />
            <FormField
              label="Landmark"
              registration={register("landmark")}
              error={errors.landmark}
            />
            <FormField
              label="City"
              registration={register("city")}
              error={errors.city}
            />
            <FormField
              label="State"
              registration={register("state")}
              error={errors.state}
            />
            <FormField
              label="Country"
              registration={register("country")}
              error={errors.country}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {existingAddress ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressFormModal;
