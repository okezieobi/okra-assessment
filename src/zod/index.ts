import { ObjectId } from "mongodb";
import { z } from "zod";

export * from "./user";

export const UserIdSchema = z.object({
  userId: z
    .string()
    .refine((arg) => ObjectId.isValid(arg), "User id muts be valid object id"),
});
