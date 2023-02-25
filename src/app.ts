require("./db/mongoose");
const express = require("express");

import userRouter from "./routes/UserRoute";
import taskRouter from "./routes/TaskRoute";

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

export default app;
