import e from "express";
import Message from "../models/Message.js";
import User from "../models/Users.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInuserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInuserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "An error occurred while fetching contacts." });
    }
};


export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 }); // Sort messages by creation time (oldest first)

        res.status(200).json(messages);

    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "An error occurred while fetching messages." });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const senderId = req.user._id;
        const { id: receiverId } = req.params;

        if (!text && !image) {
            return res.status(400).json({ message: "Text or image is required." });
        }
        if (senderId.equals(receiverId)) {
            return res.status(400).json({
                message: "Cannot send messages to yourself."
            });
        }
        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) {
            return res.status(404).json({ message: "Receiver not found." });
        }

        let imageUrl;

        if (image) {
            const uploadResource = await cloudinary.uploader.upload(image);
            imageUrl = uploadResource.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        // todo: send message to receiver in real-time using socket.io

        res.status(201).json(newMessage);

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "An error occurred while sending the message." });
    }
};


export const getChatPartners = async (req, res) => {
    try {
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId },
                { receiverId: myId }
            ]
        });

        const chatPartnerIds = [
            ...new Set(
                messages.map(msg =>
                    msg.senderId.toString() === myId.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                )
            )
        ];

        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");


        res.status(200).json(chatPartners);
    } catch (error) {
        console.error("Error fetching chat partners:", error);
        res.status(500).json({ error: "An error occurred while fetching chat partners." });
    }
};
