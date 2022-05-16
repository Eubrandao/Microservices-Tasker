import express from "express";
import httpProxy from "express-http-proxy";
const app = express();
import routes from "./routes/routes.js";
import connectDb from "./middlewares/connectDb.js";
import Signin from "./signin.js";
import cors from "cors";
app.use(cors());
connectDb;
app.use(express.json());
routes(app);

const serviceTask = httpProxy("http://localhost:3000");

app.get("/tasks/:id", (req, res, next) => {
  serviceTask(req, res, next);
});

app.get("/tasks", (req, res, next) => {
  serviceTask(req, res, next);
});

app.post("/tasks", Signin.verifyJWT, (req, res, next) => {
  serviceTask(req, res, next);
});

app.delete("/tasks/:id", Signin.verifyJWT, (req, res, next) => {
  serviceTask(req, res, next);
});

app.put("/tasks/:id", Signin.verifyJWT, (req, res, next) => {
  serviceTask(req, res, next);
});

const serviceSignup = httpProxy("http://localhost:3001");
app.get("/users/:id", Signin.verifyJWT, (req, res, next) => {
  serviceSignup(req, res, next);
});

app.get("/users", Signin.verifyJWT, (req, res, next) => {
  serviceSignup(req, res, next);
});

app.post("/users", (req, res, next) => {
  serviceSignup(req, res, next);
});

app.delete("/users/:id", Signin.verifyJWT, (req, res, next) => {
  serviceSignup(req, res, next);
});

app.put("/users/:id", Signin.verifyJWT, (req, res, next) => {
  serviceSignup(req, res, next);
});

// // Authentication
// app.use((req, res, next) => {
//   // TODO: my authentication logic
//   next()
// })

const port = 3004;
app.listen(port, () => {
  console.log("ok");
});
