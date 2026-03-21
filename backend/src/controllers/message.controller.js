import e from "express";
import Message from "../models/Message.js";
import User from "../models/Users.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketIds, io } from "../lib/socket.js";

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
        const receiverSocketIds = getReceiverSocketIds(receiverId);
        if (receiverSocketIds) {
            receiverSocketIds.forEach(socketId => {
                io.to(socketId).emit("newMessage", newMessage);
            });
        }



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

export const editMessage = async (req, res) => {
    try {
        const { id: messageId } = req.params;
        const { text } = req.body;
        const senderId = req.user._id;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ message: "Message not found." });
        }

        if (message.senderId.toString() !== senderId.toString()) {
            return res.status(403).json({ message: "You can only edit your own messages." });
        }

        message.text = text;
        message.isEdited = true;
        await message.save();

        const receiverSocketIds = getReceiverSocketIds(message.receiverId);
        if (receiverSocketIds) {
            receiverSocketIds.forEach(socketId => {
                io.to(socketId).emit("messageEdited", message);
            });
        }
        
        // Emit to sender's other devices
        const senderSocketIds = getReceiverSocketIds(message.senderId);
        if (senderSocketIds) {
             senderSocketIds.forEach(socketId => {
                 io.to(socketId).emit("messageEdited", message);
             });
        }

        res.status(200).json(message);

    } catch (error) {
        console.error("Error editing message:", error);
        res.status(500).json({ error: "An error occurred while editing the message." });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { id: messageId } = req.params;
        const senderId = req.user._id;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ message: "Message not found." });
        }

        if (message.senderId.toString() !== senderId.toString()) {
            return res.status(403).json({ message: "You can only delete your own messages." });
        }

        await Message.findByIdAndDelete(messageId);

        const eventData = { messageId, receiverId: message.receiverId, senderId: message.senderId };

        const receiverSocketIds = getReceiverSocketIds(message.receiverId);
        if (receiverSocketIds) {
            receiverSocketIds.forEach(socketId => {
                io.to(socketId).emit("messageDeleted", eventData);
            });
        }
        
        // Emit to sender's other devices
        const senderSocketIds = getReceiverSocketIds(message.senderId);
        if (senderSocketIds) {
             senderSocketIds.forEach(socketId => {
                 io.to(socketId).emit("messageDeleted", eventData);
             });
        }

        res.status(200).json({ message: "Message deleted successfully.", messageId });

    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).json({ error: "An error occurred while deleting the message." });
    }
};
