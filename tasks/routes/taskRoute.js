import express from "express";
import Task from "../task.js";
const router = express.Router();

router
  .get("/tasks", Task.listarTasks)
  .get("/tasks/:id", Task.listarTask)
  .post("/tasks", Task.cadastrarTasks)
  .put("/tasks/:id", Task.atualizarTasks)
  .delete("/tasks/:id", Task.deletarTasks);

export default router;
