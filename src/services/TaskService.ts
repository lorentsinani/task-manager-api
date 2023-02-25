const express = require("express");
import Task from "../models/TaskModel";

export class TaskService {
  createTask = async (req, res): Promise<void> => {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });

    try {
      await task.save();
      res.send(task);
    } catch (e) {
      res.status(400).send();
    }
  };

  getTasks = async (req, res): Promise<void> => {
    const match: Object = {};
    const sort: Object = {};

    if (req.query.completed) {
      //   match.completed = req.query.completed === "true";
    }

    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    try {
      // const tasks = await Task.find({ owner: req.user._id }); -> works also
      await req.user.populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      });
      res.send(req.user.tasks);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
  getTaskById = async (req, res): Promise<void> => {
    const _id = req.params.id;

    try {
      const task = await Task.findOne({ _id, owner: req.user._id });

      if (!task) {
        res.status(404).send();
      }
      res.send(task);
    } catch (e) {
      res.status(500).send();
    }
  };

  updateTask = async (req, res): Promise<void> => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      res.status(400).send({ error: "Invalid updates!" });
    }

    try {
      const task = await Task.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });

      if (!task) {
        res.status(404).send();
      }

      updates.forEach((update) =>
        task ? ([update] = req.body[update]) : Array
      );
      await task?.save();
      res.send(task);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  deleteTask = async (req, res): Promise<void> => {
    try {
      const task = await Task.findOneAndDelete({
        _id: req.params.id,
        owner: req.user._id,
      });

      if (!task) {
        res.status(404).send();
      }

      res.send(task);
    } catch (e) {
      res.status(500).send();
    }
  };
}
