import { Router } from "express";
import userController from "./user.controller.js";

const router = Router();

export const UserRouter = router
  .post("/sign-up", userController.SignUp)
  .post("/sign-in", userController.SignIn)
  .post("/sign-out", userController.signOut)
  .post("/refresh", userController.refresh);