import mongoose from "mongoose";

import { MONGODB_CONNECTION_ERROR } from "@/contants/errorMsgs";

export const connectToDatabase = async () => {
  // strictQuery is a new option in Mongoose 6.0.0 that will throw an error if you try to query a field that is not defined in your schema.
  mongoose.set("strictQuery", true);

  if (mongoose.connections[0].readyState) {
    console.log("MongoDB is already connected.");
    return;
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: process.env.DATABASE_NAME,
    });
    console.log("MongoDB is connected!");
  } catch (err) {
    // If there is an error, log it
    throw new Error(MONGODB_CONNECTION_ERROR as string);
  }
};
