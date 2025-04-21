import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be string",
    })
    .min(3, { message: "title must be at least 3 characters long" }),
  description: z
    .string({
      required_error: "description is required",
      invalid_type_error: "description should be string",
    })
    .min(3, "description must be at least 3 characters long"),
});
export const registerSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username should be string",
    })
    .min(2)
    .max(100), //.optional(),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email should be string",
    })
    .min(3)
    .max(200)
    .email(),
  password: z.string().min(6, "password must be at least 6 characters long"),
});
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email should be string",
    })
    .min(3)
    .max(200)
    .email(),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password should be string",
    })
    .min(6, "password must be at least 6 characters long"),
});
export const updateSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username should be string",
    })
    .min(2)
    .max(100).optional(),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email should be string",
    })
    .min(3)
    .max(200)
    .email().optional(),
  password: z.string().min(6, "password must be at least 6 characters long").optional(),
});
export const createCommentShema = z.object({
  text: z.string().min(2).max(500),
  articleId: z.number(),
});
export const updateCommentShema = z.object({
  text: z.string().min(2).max(500).optional(),
});