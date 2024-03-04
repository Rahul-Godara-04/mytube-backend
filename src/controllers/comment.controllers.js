import mongoose from "mongoose";
import { comment } from "../models/comment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
    try {
        const { videoId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Query comments for the specified video, apply pagination and sorting
        const comments = await comment.find({ videoId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Sort by most recent first

        res.json(new ApiResponse(true, "Comments fetched successfully", comments));
    } catch (err) {
        res.status(500).json(new ApiError(err.message));
    }
});

const addComments = asyncHandler(async (req, res) => {
    try {
        const { videoId, text } = req.body;

        const newComment = new comment({
            videoId,
            text,
        });

        const savedComment = await newComment.save();

        res.json(new ApiResponse(true, "Comment added successfully", savedComment));
    } catch (err) {
        res.status(500).json(new ApiError(err.message));
    }
});

const updateComment = asyncHandler(async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;

        // Find and update the comment
        const updatedComment = await comment.findByIdAndUpdate(
            commentId,
            { text },
            { new: true } // Return the updated document
        );

        if (!updatedComment) {
            throw new Error("Comment not found");
        }

        res.json(new ApiResponse(true, "Comment updated successfully", updatedComment));
    } catch (err) {
        res.status(404).json(new ApiError(err.message));
    }
});

const deleteComment = asyncHandler(async (req, res) => {
    try {
        const { commentId } = req.params;

        const deletedComment = await comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            throw new Error("Comment not found");
        }

        res.json(new ApiResponse(true, "Comment deleted successfully"));
    } catch (err) {
        res.status(404).json(new ApiError(err.message));
    }
});

export { getVideoComments, addComments, updateComment, deleteComment };
