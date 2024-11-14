import express from "express";
import { UserCollection } from "../mongodb";
import { PaginatedListSchema, UserIdSchema, UserSchema } from "../zod";
import { ObjectId } from "mongodb";
const router = express.Router();

/* GET users listing. */
router
  .route("/")
  .post(async (req, res, next) => {
    try {
      const input = await UserSchema.safeParseAsync(req.body);
      if (input.success == false) {
        throw res.status(400).send({
          status: false,
          message: "error",
          data: input.error,
        });
      }
      const user = await UserCollection.findOne({ email: input.data.email });
      if (user) {
        throw res.status(409).send({
          status: false,
          message: `User with provided email already exists`,
          data: null,
        });
      }
      const inserted = await UserCollection.insertOne({
        ...input.data,
        createdAt: new Date().toUTCString(),
        updatedAt: new Date().toUTCString(),
      });
      const data = await UserCollection.findOne({ _id: inserted.insertedId });
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
      const query = await PaginatedListSchema.safeParseAsync(req.query);
      if (query.success == false) {
        throw res.status(400).send({
          status: false,
          message: "error",
          data: query.error,
        });
      }
      const users = await UserCollection.find({})
        .limit(query.data.limit)
        .skip(query.data.skip)
        .sort({ _id: query.data.sort == "asc" ? 1 : -1 })
        .toArray();
      res.send({
        status: true,
        message: "success",
        data: {
          pagination: query.data,
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:userId")
  .get(async (req, res, next) => {
    try {
      const filter = await UserIdSchema.safeParseAsync(req.params);
      if (filter.success == false) {
        throw res.status(400).send({
          status: false,
          message: "error",
          data: filter.error,
        });
      }
      const data = await UserCollection.findOne({
        _id: new ObjectId(filter.data.userId),
      });
      if (data == null) {
        throw res.status(404).send({
          status: false,
          message: "User not found with provided id",
          data: null,
        });
      }
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
      const filter = await UserIdSchema.safeParseAsync(req.params);
      if (filter.success == false) {
        throw res.status(400).send({
          status: false,
          message: "error",
          data: filter.error,
        });
      }
      const userById = await UserCollection.findOne({
        _id: new ObjectId(filter.data.userId),
      });
      if (userById == null) {
        throw res.status(404).send({
          status: false,
          message: "User not found with provided id",
          data: null,
        });
      }
      const input = await UserSchema.partial().safeParseAsync(req.body);
      if (input.success == false) {
        throw res.status(400).send({
          status: false,
          message: "error",
          data: input.error,
        });
      }
      if (input.data.email) {
        const userByEmail = await UserCollection.findOne({
          email: input.data.email,
        });
        if (userByEmail != null) {
          throw res.status(409).send({
            status: false,
            message: "User with provided email already exists",
            data: null,
          });
        }
      }
      await UserCollection.updateOne(
        { _id: new ObjectId(filter.data.userId) },
        {
          $set: {
            ...(input.data.age && { age: input.data.age }),
            ...(input.data.email && { email: input.data.email }),
            ...(input.data.username && { username: input.data.username }),
            ...(input.data.city && { city: input.data.city }),
            updatedAt: new Date().toUTCString(),
          },
        },
      );
      const data = await UserCollection.findOne({
        _id: new ObjectId(filter.data.userId),
      });
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
