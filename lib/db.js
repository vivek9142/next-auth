import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gnmor.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`
  );

  return client;
}
