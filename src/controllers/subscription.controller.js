import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.models.js"
import { subscription } from "../models/subscription.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params
    //TODO: toggle subscription 
})

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params
    //TODO: 
})

const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subcriberId } = req.params

})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}