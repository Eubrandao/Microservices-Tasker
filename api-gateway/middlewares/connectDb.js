import mongoose from "mongoose";
const db = mongoose.connection;
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DB_CONNECTION_STRING);

mongoose.connection.on("connected", () => console.log("Connected to DB!"));
mongoose.connection.on("error", (error) => console.log(error));

export default db;
