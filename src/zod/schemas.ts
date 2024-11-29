import { ObjectId } from "mongodb";
import { z } from "zod";

export const UserIdSchema = z.object({
  userId: z
    .string()
    .refine((arg) => ObjectId.isValid(arg), "User id muts be valid object id"),
});

export const PaginatedListSchema = z.object({
  skip: z.number().default(0),
  sort: z.enum(["asc", "desc"]).default("desc"),
  limit: z.number().default(10),
});
export type PaginatedListSchema = z.infer<typeof PaginatedListSchema>;

export const UserSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  age: z.number(),
  city: z.string(),
});
export type UserSchema = z.infer<typeof UserSchema>;
