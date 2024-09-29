import { object, string, TypeOf, z } from "zod";
import { RoleEnumType } from "../entities/user.entity";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    email: string({
      required_error: "Email address is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: string({
      required_error: "Please confirm your password",
    }),
    role: z.optional(z.nativeEnum(RoleEnumType)),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  }),
});

const params = {
  params: object({
    userId: string(),
  }),
};

export const updateUserSchema = object({
  ...params,
  body: object({
    name: string(),
    email: string().email("Invalid email address"),
    car: string(),
    birthDate: string(),
    phone: string(),
    password: string()
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: string(),
    imageUrl: string().nullable(),
    role: z.optional(z.nativeEnum(RoleEnumType)),
  })
    .partial()
    .refine((data) => data.password === data.passwordConfirm, {
      path: ["passwordConfirm"],
      message: "Passwords do not match",
    }),
});

export const getUserSchema = object({
  ...params,
});

export const deleteUserSchema = object({
  ...params,
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email address is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    }).min(8, "Invalid email or password"),
    firebaseToken: string(),
  }),
});

export const verifyEmailSchema = object({
  params: object({
    verificationCode: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Email is invalid"),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    resetToken: string(),
  }),
  body: object({
    password: string({
      required_error: "Password is required",
    }).min(8, "Password must be more than 8 characters"),
    passwordConfirm: string({
      required_error: "Please confirm your password",
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  }),
});

export const resendVerificationCodeSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Email is invalid"),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>["body"],
  "passwordConfirm"
>;

export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>["params"];
export type ResendVerificationCodeInput = TypeOf<
  typeof resendVerificationCodeSchema
>["body"];

export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type GetUserInput = TypeOf<typeof getUserSchema>["params"];
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>["params"];
