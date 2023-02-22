const express = require("express");
const taskRouter = new express.Router();
const auth = require("../middleware/auth");
import { TaskController } from "../controllers/TaskController";
import { TaskService } from "../services/TaskService";

const taskService = new TaskService();
const taskController = new TaskController(taskService);

taskRouter.post("/tasks", auth, taskController.createTask);

taskRouter.get("/tasks", auth, taskController.getTasks);

taskRouter.get("/tasks/:id", auth, taskController.getTaskById);

taskRouter.patch("/tasks/:id", auth, taskController.updateTask);

taskRouter.delete("/tasks/:id", auth, taskController.deleteTask);

export default taskRouter;
