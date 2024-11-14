import { MongoClient } from "mongodb";

import { UserSchema } from "./zod";

// Replace the uri string with your connection string.
const uri = "mongodb://root:example@127.0.0.1:27017";

type Base = {
  createdAt: string;
  updatedAt: string;
};

type User = UserSchema & Base;

export const mongoClient = new MongoClient(uri);
export const mongoDatabase = mongoClient.db("okra-assessment");
export const UserCollection = mongoDatabase.collection<User>("users");
