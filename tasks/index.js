import express from "express";
import taskConnectDb from "./middlewares/taskConnectDb.js";
import routes from "./routes/route.js";

taskConnectDb;

const app = express();
app.use(express.json());
routes(app);

app.listen(3000, () => {
  console.log("ok");
});

export default app;
