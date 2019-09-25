import express from 'express';
import routes from '../routes';
import { users, userDetail, editProfile, changePassword } from '../controller/userController';

const userRouter = express.Router();
userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.home, users);

export default userRouter;
