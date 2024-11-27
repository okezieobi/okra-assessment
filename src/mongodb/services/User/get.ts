import { ObjectId } from "mongodb";
import { UserCollection } from "../../client";
import { AppError } from "../../../error";

export class GetUser {
  async byId(userId: string) {
    const data = await UserCollection.findOne({
      _id: new ObjectId(userId),
    });
    if (data == null) {
      throw new AppError("User not found with provided id", 404);
    }
    return data;
  }
}
