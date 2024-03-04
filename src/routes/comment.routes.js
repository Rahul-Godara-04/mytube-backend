import { Router } from "express";
import {
    getVideoComments,
    addComments,
    updateComment,
    deleteComment,
} from "../controllers/comment.controllers.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// Apply JWT verification middleware globally to secure all routes
router.use(verifyJWT);

// Route for fetching video comments (GET /:videoId)
router.get("/:videoId", getVideoComments);

// Route for adding a comment to a video (POST /:videoId)
router.post("/:videoId", addComments);

// Route for updating a comment (PATCH /c/:commentId)
router.patch("/c/:commentId", updateComment);

// Route for deleting a comment (DELETE /c/:commentId)
router.delete("/c/:commentId", deleteComment);

export default router;
