import express from "express";
import logger from "morgan";

import usersRouter from "./routes/users";

const app = express();
const router = express.Router();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.use("/users", usersRouter);
app.use("/api/v1", router);

app.use(
  (
    err: Error,
    req: unknown,
    res: unknown,
    next: (...arg: unknown[]) => void,
  ) => {
    console.error(err);
    next(err);
  },
);

export default app;
