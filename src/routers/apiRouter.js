import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment
} from "../controller/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.registerView, postRegisterView);

export default apiRouter;
