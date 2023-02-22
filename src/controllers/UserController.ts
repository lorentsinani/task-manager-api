import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUser = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.userService.getUser(req, res));
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.userService.createUser(req, res));
  };

  loginUser = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.userService.loginUser(req, res));
  };

  logoutUser = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.userService.logoutUser(req, res));
  };

  logoutAllUser = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.userService.logoutAllUser(req, res));
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.userService.updateUser(req, res));
  };

  deleteLoggedUser = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.userService.deleteLoggedUser(req, res));
  };

  // uploadProfilePic = (req: Request, res: Response): void => {
  //   res.json(this.userService.uploadProfilePic(req, res));
  // };

  deleteProfilePic = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.userService.deleteProfilePic(req, res));
  };

  getProfilePicById = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.userService.getProfilePicById(req, res));
  };
}
