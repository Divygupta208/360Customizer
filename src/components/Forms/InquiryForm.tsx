import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import simulatedApi from "../../api/simulatedapi";
import { useEffect } from "react";

export const formSchema = z.object({
  firstName: z
    .string()
    .regex(/^[A-Za-z]+$/, "Only alphabets allowed")
    .min(2, "First name must be at least 2 characters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[A-Za-z]+$/, "Only alphabets allowed"),
  email: z.string().email("Invalid email address"),

  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  message: z.string().min(10, "Message must be at least 10 characters"),

  budget: z
    .string()
    .refine((val) => val !== "Choose Budget" && val.trim() !== "", {
      message: "Please select a budget option",
    }),
});

type Inputs = z.infer<typeof formSchema>;
const InquiryForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
      budget: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await simulatedApi(data);
      console.log("Success:", response);
      window.alert("form submitted successfully");
    } catch (error: any) {
      setError("root", {
        message: error.message,
      });
      window.alert("500:server error");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 bg-white border border-gray-300 rounded-lg p-4 shadow-2xl space-y-4"
      >
        <h3 className="text-center text-white font-extrabold uppercase w-full bg-indigo-600 rounded-xl p-4">
          Inquiry Form
        </h3>
        <div className="flex flex-col items-start sm:items-start gap-2">
          <label className="w-32 font-medium">First Name</label>
          <input
            {...register("firstName")}
            className="flex-1 w-full border border-gray-300 rounded px-4 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        {errors.firstName && (
          <p className="text-red-500 text-sm font-bold">
            {errors.firstName?.message}
          </p>
        )}

        <div className="flex flex-col items-start sm:items-start gap-2">
          <label className="w-32 font-medium">Last Name</label>
          <input
            {...register("lastName")}
            className="flex-1 w-full border border-gray-300 rounded px-4 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        {errors.lastName && (
          <p className="text-red-500 text-sm font-bold">
            {errors.lastName?.message}
          </p>
        )}

        <div className="flex flex-col items-start sm:items-start gap-2">
          <label className="w-32 font-medium">Email</label>
          <input
            {...register("email")}
            className="flex-1 w-full border border-gray-300 rounded px-4 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm font-bold">
            {errors.email?.message}
          </p>
        )}

        <div className="flex flex-col items-start sm:items-start gap-2">
          <label className="w-32 font-medium">Phone</label>
          <input
            {...register("phoneNumber")}
            className="flex-1 w-full border border-gray-300 rounded px-4 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm font-bold">
            {errors.phoneNumber?.message}
          </p>
        )}

        <div className="flex flex-col items-start sm:items-start gap-2">
          <label className="w-32 font-medium">Message</label>
          <textarea
            rows={4}
            {...register("message")}
            className="flex-1 w-full border border-gray-300 rounded px-4 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        {errors.message && (
          <p className="text-red-500 text-sm font-bold">
            {errors.message?.message}
          </p>
        )}

        <div className="flex flex-col items-start sm:items-start gap-2">
          <label className="w-32 font-medium">Budget</label>
          <select
            {...register("budget")}
            className="flex-1 w-full border border-gray-300 rounded px-4focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option disabled>budget</option>
            <option>{`< 500`}</option>
            <option>{`500 - 1000`}</option>
            <option>{`> 1000`}</option>
          </select>
        </div>
        {errors.budget && (
          <p className="text-red-500 text-sm font-bold">
            {errors.budget?.message}
          </p>
        )}

        {errors.root && (
          <p className="text-red-500 font-bold">{errors.root.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-700 h-10 rounded-xl text-white font-bold"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default InquiryForm;
