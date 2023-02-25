import { Schema, model, Document, Model, PopulatedDoc } from "mongoose";
import { ITask } from "../entities/Task";

const taskSchema: Schema<ITask> = new Schema(
  {
    description: {
      type: String,
      trim: true,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task: Model<ITask> = model<ITask>("Task", taskSchema);

export default Task;
