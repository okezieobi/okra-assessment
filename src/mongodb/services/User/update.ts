import { ObjectId } from "mongodb";
import { AppError } from "../../../error";
import { UserCollection } from "../../client";
import { InsertUserArg } from "./insert";

export class UpdateUser {
  constructor(private args: Partial<InsertUserArg>) {}

  async main(userId: string) {
    if (this.args.email) {
      const userByEmail = await UserCollection.findOne({
        email: this.args.email,
      });
      if (userByEmail != null) {
        throw new AppError("User with provided email already exists", 409);
      }
    }
    await UserCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          ...(this.args.age && { age: this.args.age }),
          ...(this.args.email && { email: this.args.email }),
          ...(this.args.username && { username: this.args.username }),
          ...(this.args.city && { city: this.args.city }),
          updatedAt: new Date().toUTCString(),
        },
      },
    );
    return UserCollection.findOne({
      _id: new ObjectId(userId),
    });
  }
}
