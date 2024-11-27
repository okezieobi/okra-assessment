import { PaginatedListSchema } from "../../../zod";
import { UserCollection } from "../../client";

export class ListUsers {
  async paginated(query: PaginatedListSchema) {
    return UserCollection.find({})
      .limit(query.limit)
      .skip(query.skip)
      .sort({ _id: query.sort == "asc" ? 1 : -1 })
      .toArray();
  }

  async groupByAvgAge() {
    return UserCollection.aggregate([
      {
        $group: {
          // group users by agae and city
          _id: { age: "$age", city: "$city" },
          // count users in each group
          count: { $sum: 1 },
          // calculate aveg age of users in a each group
          averageAge: { $avg: "$age" },
        },
      },
      { $sort: { "_id.age": 1, "_id.city": 1 } },
    ]).toArray();
  }
}
