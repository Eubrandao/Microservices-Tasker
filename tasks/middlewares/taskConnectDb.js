import mongoose from "mongoose";

const db = mongoose.connection;

const { DB_CONNECTION_STRING } = process.env;

mongoose.connect(
  "mongodb+srv://well:Qwer456@cluster0.qvutp.mongodb.net/task-manager?retryWrites=true&w=majority"
);
mongoose.connection.on("connected", () => console.log("Connected to DB"));
mongoose.connection.on("error", (error) =>
  console.log("Failed to connected in DB" + error)
);

export default db;
