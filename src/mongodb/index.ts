import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = "mongodb://root:password@localhost:27017/?authSource=admin";

export const client = new MongoClient(uri);
export const database = client.db("okra-assessment");

client
  .connect()
  .then(() => console.log("Coonection successfull"))
  .catch(console.error);
