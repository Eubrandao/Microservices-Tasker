import TaskModel from "./models/TaskModel.js";

class Task {
  static listarTasks = (req, res) => {
    TaskModel.find((err, tasks) => {
      res.status(200).json(tasks);
    });
  };

  static listarTask = (req, res) => {
    const id = req.params.id;
    TaskModel.findById(id, (err, tasks) => {
      res.status(200).json({ msg: tasks });
    });
  };
  static cadastrarTasks = (req, res) => {
    const task = {
      name: req.body.name,
      description: req.body.description,
      previsionDate: req.body.previsionDate,

      finishDate: req.body.finishDate,
    };
    TaskModel.create(task);
    res.status(201).json({ msg: "Tarefa criada com sucesso!" });
  };

  static atualizarTasks = (req, res) => {
    const id = req.params.id;

    TaskModel.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).json({ msg: "Tarefa atualizada com sucesso" });
      } else {
        res.status(500).json({ msg: err });
      }
    });
  };

  static deletarTasks = (req, res) => {
    const id = req.params.id;

    TaskModel.findByIdAndDelete(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).json({ msg: "Tarefa deletada com sucesso!" });
      } else {
        res.status(500).json({ msg: err });
      }
    });
  };
}

export default Task;
