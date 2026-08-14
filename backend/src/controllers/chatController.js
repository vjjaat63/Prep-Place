import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const streamId = (req.user.streamUserId || req.user._id).toString();
    const token = chatClient.createToken(streamId);

    res.status(200).json({
      token,
      userId: streamId,
      userName: req.user.name,
      userImage: req.user.image,
    });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
