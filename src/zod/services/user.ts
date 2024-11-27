import { PaginatedListSchema, UserIdSchema, UserSchema } from "../schemas";
import { ZodServices } from "./main";

export class UserSchemaServices extends ZodServices {
  parseInsert() {
    return this.parseData(UserSchema);
  }

  parsePaginatedList() {
    return this.parseData(PaginatedListSchema);
  }

  parseId() {
    return this.parseData(UserIdSchema);
  }

  parseUpdate() {
    return this.parseData(UserSchema.partial());
  }
}
