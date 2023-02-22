import { Document, PopulatedDoc } from "mongoose";
import { IUser } from "./User";

export interface ITask extends Document {
  description: string;
  completed: boolean;
  owner: PopulatedDoc<IUser & Document>;
}
