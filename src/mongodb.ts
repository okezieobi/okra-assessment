import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = "mongodb://root:example@127.0.0.1:27017";

export interface User {
  email: string;
  username: string;
  age: number;
  city: string;
  createdAt: string;
  updatedAt: string;
}

export const mongoClient = new MongoClient(uri);
export const mongoDatabase = mongoClient.db("okra-assessment");
export const UserCollection = mongoDatabase.collection<User>("users");
