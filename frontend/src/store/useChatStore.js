import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

// const notificationSound = new Audio("/sounds/notification.mp3");


export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,


    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({ isSoundEnabled: !get().isSoundEnabled })
    },

    setActiveTab: (tab) => set({ activeTab: tab }),

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getAllContacts: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get("/messages/contacts")
            set({ allContacts: res.data })

        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isUserLoading: false })
        }


    },

    getMyChatPartners: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get("/messages/chats")
            set({ chats: res.data })

        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isUserLoading: false })
        }
    },


    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({ messages: res.data })

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load messages")

        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true, // flag to identify optimistic messages (optional)
        };
        // immidetaly update the ui by adding the message
        set({ messages: [...messages, optimisticMessage] });



        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({ messages: messages.concat(res.data) })

        } catch (error) {
            set({ messages: messages });
            toast.error(error.response?.data?.message || "Failed to send message")
        }

    },

    editMessage: async (messageId, newText) => {
        const { messages } = get();
        try {
            const res = await axiosInstance.put(`/messages/edit/${messageId}`, { text: newText });
            const updatedMessage = res.data;
            set({ messages: messages.map(msg => msg._id === messageId ? updatedMessage : msg) });
            toast.success("Message edited successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to edit message");
        }
    },

    deleteMessage: async (messageId) => {
        const { messages } = get();
        try {
            await axiosInstance.delete(`/messages/delete/${messageId}`);
            set({ messages: messages.filter(msg => msg._id !== messageId) });
            toast.success("Message deleted successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete message");
        }
    },

    subscribeToMessages: () => {
        const { selectedUser, isSoundEnabled } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {

            const isMessageFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageFromSelectedUser) return;


            const currentMessages = get().messages;
            set({ messages: [...currentMessages, newMessage] });

            if (isSoundEnabled) {
                const notificationSound = new Audio("/sounds/notification.mp3");

                notificationSound.currentTime = 0;
                notificationSound.play().catch((error) => {
                    console.error("Error playing notification sound:", error);
                });

            }
        });

        socket.on("messageEdited", (updatedMessage) => {
            const { messages, selectedUser } = get();
            if (!selectedUser || (updatedMessage.senderId !== selectedUser._id && updatedMessage.receiverId !== selectedUser._id)) return;
            set({ messages: messages.map(msg => msg._id === updatedMessage._id ? updatedMessage : msg) });
        });

        socket.on("messageDeleted", ({ messageId, receiverId, senderId }) => {
            const { messages, selectedUser } = get();
            if (!selectedUser || (senderId !== selectedUser._id && receiverId !== selectedUser._id)) return;
            set({ messages: messages.filter(msg => msg._id !== messageId) });
        });
    },

    unSubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
        socket.off("messageEdited");
        socket.off("messageDeleted");
    }

}))