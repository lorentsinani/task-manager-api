import { TaskService } from "./../services/TaskService";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  createTask = async (req, res) => {
    await res.json(this.taskService.createTask(req, res));
  };

  getTasks = async (req, res) => {
    await res.json(this.taskService.getTasks(req, res));
  };

  getTaskById = async (req, res) => {
    await res.json(this.taskService.getTaskById(req, res));
  };

  updateTask = async (req, res) => {
    await res.json(this.taskService.updateTask(req, res));
  };

  deleteTask = async (req, res) => {
    await res.json(this.taskService.deleteTask(req, res));
  };
}
