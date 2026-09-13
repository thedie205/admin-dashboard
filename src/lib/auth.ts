
import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
    remember: z.boolean(),

});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    name:z.string()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
})

export type RegisterFormData = z.infer<typeof registerSchema>;