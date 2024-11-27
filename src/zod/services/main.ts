import { z } from "zod";
import { AppError } from "../../error";

export abstract class ZodServices {
  constructor(protected data: unknown) {}
  protected parseData<T extends z.ZodTypeAny>(schema: T) {
    const input = schema.safeParse(this.data);
    if (!input.success) {
      throw new AppError(input.error.message, 400, input.error.issues);
    }
    return input.data as z.infer<T>; //                        ^^^^^^^^^^^^^^ <- add this
  }
}
