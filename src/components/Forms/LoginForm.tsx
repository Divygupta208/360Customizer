import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField"; // Adjust path if needed
import { ClipLoader } from "react-spinners";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC<any> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-full"
    >
      <FormField
        label="Email"
        type="email"
        registration={register("email")}
        error={errors.email}
      />
      <FormField
        label="Name"
        type="text"
        registration={register("name")}
        error={errors.name}
      />
      <button
        type="submit"
        className="bg-black text-white rounded py-2 px-4 mt-2"
        disabled={loading}
      >
        {loading ? <ClipLoader size={18} color="#fff" /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
