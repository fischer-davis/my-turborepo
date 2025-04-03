import { z } from "zod";

export const PASSWORD_MAX_LENGTH = 100;

export const zSignUpSchema = z.object({
  name: z.string().min(1, { message: "Name can't be empty" }),
  email: z.string().email(),
  password: z.string().min(8).max(PASSWORD_MAX_LENGTH),
  confirmPassword: z.string(),
});

export const zSignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  rememberMe: z.boolean(),
});
