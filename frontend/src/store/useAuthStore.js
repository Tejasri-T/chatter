import {create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isLoading: false,
    socket: null,
    onlineUsers: [],

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {

            const res = await axiosInstance.post("/auth/signup", data);

            set({ authUser: res.data });

            //toast 
            toast.success("Signup successful! Welcome to Chatter.");

            get().connectSocket();

        }catch (error) {
            
            toast.error(error.response?.data?.message || "Error signing up. Please try again."); 
        }finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            console.log("Login successful, response data:", res.data);
            set({ authUser: res.data });
            console.log("Auth user set in store:", res.data);
            toast.success("Login successful! Welcome back.");

            get().connectSocket();
        } catch (error) {
            // console.error("Error logging in", error);
            toast.error(error.response?.data?.message || "Error logging in.");
        }finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("You have been logged out.");

            get().disconnectSocket();
        } catch (error) {
            console.error("Error logging out", error);
            toast.error(error.response?.data?.message || "Error logging out. Please try again.");
        }
    },


    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data, isCheckingAuth: false });

            get().connectSocket();

        }catch(error){
            console.error("Error checking auth status", error);
            set({ authUser: null, isCheckingAuth: false });
        }
    },

    
    updateProfile: async (data) => {
        set({ isLoading: true });
        try{
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully.");
            console.log("Profile updated successfully", res.data);
        }catch(error){
            console.error("Error updating profile", error);
            toast.error(error.response?.data?.message || "Error updating profile. Please try again.");
        }finally {
            set({ isLoading: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            withCredentials: true
        });

        socket.connect();

        set({ socket });


        // Listen for online users list from the server

        socket.on("getOnlineUsers", (onlineUserIds) => {
            console.log("Online users:", onlineUserIds);
            set({ onlineUsers: onlineUserIds });
        });

     },

     disconnectSocket: () => {
       if (get().socket?.connected)  get().socket?.disconnect();
     }


}));