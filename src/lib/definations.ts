import { z } from "zod";

export const SignupFormSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "Firstname must be at least 2 characters long." })
    .trim(),
  lastname: z
    .string()
    .min(2, { message: "Lastname must be at least 2 characters long." })
    .trim(),
  username: z
    .string()
    .toLowerCase()
    .min(2, { message: "Username must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  isAdmin: z.string(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .trim(),
});

export const RegisterPatientSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  age: z.number().int().min(1, { message: "Age must be at least 1." }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  aadhaar: z.string().length(12, { message: "Aadhaar must be 12 characters." }),
  sensorID: z
    .string()
    .length(24, { message: "Sensor ID must be 24 characters." }),
});

export type FormState =
  | {
      errors?: {
        firstname?: string[];
        lastname?: string[];
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
