import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";



import {
    loginSchema,
    type LoginFormData,
} from "../../lib/auth";

import { loginUser } from "../../services/userService";

const FormLogin = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: `${(import.meta.env.VITE_TEST_EMAIL) ? import.meta.env.VITE_TEST_EMAIL : 'test@example.com'}`,
            password: `${(import.meta.env.VITE_TEST_PASSWORD) ? import.meta.env.VITE_TEST_PASSWORD : 'test1234'}`,
            remember: true,
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoginError("");
        setIsLoading(true);

        try {
            loginUser(data);

            await new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );

            navigate("/", { replace: true });
        } catch (error) {
            setLoginError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2"
        >
            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium text-gray-700"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    {...register("email")}
                    className="h-[30px] w-full  border border-gray-200 bg-[#F4F5F9] px-2 text-xs outline-none transition focus:border-[#6E39CB] focus:ring-1 focus:ring-[#6E39CB]"
                />

                <div className="min-h-[15px]">
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-medium text-gray-700"
                >
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    placeholder="••••••••••"
                    autoComplete="current-password"
                    {...register("password")}
                    className="h-[30px] w-full  border border-gray-200 bg-[#F4F5F9] px-2 text-xs outline-none transition focus:border-[#6E39CB] focus:ring-1 focus:ring-[#6E39CB]"
                />

                <div className="min-h-[15px]">
                    {errors.password && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
                <Link
                    to="/forgot-password"
                    className="text-xs text-[#6E39CB] hover:underline"
                >
                    Forgot password
                </Link>
            </div>

            {/* Sign In */}
            <button
                type="submit"
                disabled={isLoading}
                className="flex h-[30px] my-3 w-full items-center justify-center rounded bg-[#6E39CB] text-xs text-white transition hover:bg-[#5B2DB0] disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isLoading ? (
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                    "Sign in"
                )}
            </button>

            {/* Social Login */}
            <div className="mt-2 space-y-2">
                <button
                    type="button"
                    className="flex h-[30px] w-full  items-center justify-center gap-2 rounded border border-gray-200 bg-white text-xs text-gray-600 transition hover:bg-gray-50"
                >
                    <FcGoogle size={20} className="text-gray-500" />

                    <span className=" text-center">
                        Sign in with Google
                    </span>
                </button>

                <button
                    type="button"
                    className="flex h-[30px] w-full items-center justify-center gap-1 rounded border border-gray-200 bg-white leading-6 text-xs text-gray-600 transition hover:bg-gray-50"
                >
                    <FaFacebook size={20} color="#1877F2"  />

                    <span className=" text-center">
                        Sign in with Facebook
                    </span>
                </button>
            </div>

            {/* Register */}
            <div className="pt-2 text-center">
                <span className="text-xs text-gray-500">
                    Don't have an account?{" "}
                </span>

                <Link
                    to="/register"
                    className="text-xs text-[#6E39CB] hover:underline"
                >
                    Sign up
                </Link>
            </div>
        </form>
    );
};

export default FormLogin;