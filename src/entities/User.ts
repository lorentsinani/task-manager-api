import mongoose, { Document } from "mongoose";

import { ITask } from "./Task";
import Task from "../models/TaskModel";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  tokens: { token: string }[];
  avatar: Buffer;
  tasks: ITask[];
  generateAuthToken(): Promise<string>;
}
