import { ObjectId } from "mongodb";
import { z } from "zod";

export * from "./user";

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
