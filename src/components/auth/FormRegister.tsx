import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import {
    registerSchema,
    type RegisterFormData,
} from "../../lib/auth";

import { registerUser } from "../../services/userService";

const FormRegister = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [registerError, setRegisterError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setRegisterError("");
        try {
            registerUser(data);
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1200));
            navigate("/login", { replace: true });
        } catch (error) {
            setRegisterError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );

            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Name */}
            <div className="flex flex-col">
                <label
                    htmlFor="name"
                    className="mb-2 text-xs font-medium text-gray-700"
                >
                    Name
                </label>

                <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="h-8 w-full rounded-md border border-gray-300 pl-2 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
                />

                <div className="min-h-5">
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
                <label
                    htmlFor="email"
                    className="mb-2 text-xs font-medium text-gray-700"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="h-8 w-full rounded-md border border-gray-300 pl-2 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
                />

                <div className="min-h-4">
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Password */}
            <div className="flex flex-col">
                <label
                    htmlFor="password"
                    className="mb-2 text-xs font-medium text-gray-700"
                >
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="h-8 w-full rounded-md border border-gray-300 pl-2 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
                />

                <div className="min-h-4">
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Register Error */}
            <div className="h-5">
                {registerError && (
                    <p className="text-sm text-red-500">
                        {registerError}
                    </p>
                )}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isLoading}
                className="flex h-8 w-full items-center justify-center rounded-sm bg-blue-500 text-sm text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isLoading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                    "Sign Up"
                )}
            </button>

            {/* Login */}
            <div>
                <p className="my-2 text-xs text-gray-700">
                    Have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-500 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default FormRegister;