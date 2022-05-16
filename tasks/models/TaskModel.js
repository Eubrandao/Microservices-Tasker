import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  previsionDate: { type: Date, required: true },
  finishDate: { type: Date, required: false },
});

const TaskModel = mongoose.models.tasks || mongoose.model("tasks", taskSchema);
export default TaskModel;
