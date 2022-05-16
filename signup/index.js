import express from "express";
import connectDb from "./middlewares/connectDb.js";
import routes from "./routes/route.js";
import cors from "cors";

connectDb;
const app = express();
app.use(express.json());
app.use(cors());
routes(app);

const port = 3001;
app.listen(port, () => {
  console.log("Ok");
});

export default app;
