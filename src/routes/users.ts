import express from "express";
import { GetUser, InsertUser, ListUsers, UpdateUser } from "../mongodb";
import { UserSchemaServices } from "../zod";

const router = express.Router();

/* GET users listing. */
router
  .route("/")
  .post(async (req, res, next) => {
    try {
      const input = new UserSchemaServices(req.body).parseInsert();
      const data = await new InsertUser(input).main();
      res.status(201).send({
        status: true,
        message: "success",
        data,
      });
    } catch (error) {
      next(error);
    }
  })
  .get(async (req, res, next) => {
    try {
      const query = new UserSchemaServices(req.query).parsePaginatedList();
      const users = await new ListUsers().paginated(query);
      res.send({
        status: true,
        message: "success",
        data: {
          pagination: query,
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  });

router.post("/avg-age-city", async (req, res, next) => {
  try {
    const data = await new ListUsers().groupByAvgAge();
    res.send({
      status: true,
      messahe: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
});

router
  .route("/:userId")
  .get(async (req, res, next) => {
    try {
      const filter = new UserSchemaServices(req.params).parseId();
      const data = await new GetUser().byId(filter.userId);
      res.send({
        status: true,
        messgage: "success",
        data,
      });
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const filter = new UserSchemaServices(req.params).parseId();
      await new GetUser().byId(filter.userId);
      const input = new UserSchemaServices(req.body).parseUpdate();
      const data = await new UpdateUser(input).main(filter.userId);
      res.send({
        status: true,
        messgage: "success",
        data,
      });
    } catch (error) {
      next(error);
    }
  });

export default router;
