import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  age: z.number(),
  city: z.string(),
});
export type UserSchema = z.infer<typeof UserSchema>;
