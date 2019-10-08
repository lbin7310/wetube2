import express from "express";
import routes from "../routes";
import {
  userDetail,
  changePassword,
  postEditProfile,
  getEditProfile
} from "../controller/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
