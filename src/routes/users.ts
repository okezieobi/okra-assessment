import express from "express";
import { UserCollection } from "../mongodb";
const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res) {
  const users = await UserCollection.findOne();
  res.send(users);
});

export default router;
