import { UserService } from "./../services/UserService";
import { UserController } from "./../controllers/UserController";
const express = require("express");
const auth = require("../middleware/auth");
const userRouter = new express.Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.get("/users/me", auth, userController.getUser);

userRouter.post("/users", userController.createUser);

userRouter.post("/users/login", userController.loginUser);

userRouter.post("/users/logout", auth, userController.logoutUser);

userRouter.post("/users/logoutAll", auth, userController.logoutAllUser);

userRouter.patch("/users/me", auth, userController.updateUser);

userRouter.delete("/users/me", auth, userController.deleteLoggedUser);

// userRouter.post("/users/me/avatar", auth, userController.uploadProfilePic);

userRouter.delete("/users/me/avatar", auth, userController.deleteProfilePic);

userRouter.get("/users/:id/avatar", userController.getProfilePicById);

export default userRouter;
