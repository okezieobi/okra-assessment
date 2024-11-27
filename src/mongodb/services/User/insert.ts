import { AppError } from "../../../error";
import { User, UserCollection } from "../../client";

export type InsertUserArg = Pick<User, "age" | "city" | "email" | "username">;

export class InsertUser {
  constructor(private input: InsertUserArg) {}

  async main() {
    const user = await UserCollection.findOne({ email: this.input.email });
    if (user) {
      throw new AppError(`User with provided email already exists`, 409);
    }
    const inserted = await UserCollection.insertOne({
      ...this.input,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
    });
    return UserCollection.findOne({ _id: inserted.insertedId });
  }
}
