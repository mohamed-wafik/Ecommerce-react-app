import { z } from "zod";

// Login schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// TypeScript type inferred from schema
export type LoginInput = z.infer<typeof loginSchema>;

// Register schema
export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// TypeScript type inferred from schema
export type RegisterInput = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// ── Reset Password Schema (for the reset link page) ─────────────────────────

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, {
        message: "Must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Must contain at least one number." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Must contain at least one special character.",
      }),

    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
