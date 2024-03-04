import { Router } from "express";
import {
    getVideoComments,
    addComments,
    updateComment,
    deleteComment
} from "../controllers/comment.controllers.js"

import { verifyJWT } from "../middleware/auth.middleware.js"

const router = Router();
router.use(verifyJWT);

router.route("/:videoId").get(getVideoComments).post(addComments);
router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default router