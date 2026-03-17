import {create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {

            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });

            //toast 
            toast.success("Signup successful! Welcome to Chatter.");

        }catch (error) {
            console.error("Error signing up", error);
            toast.error("Error signing up. Please try again."); 
        }finally {
            set({ isSigningUp: false });
        }
    },

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data, isCheckingAuth: false });
        }catch(error){
            console.error("Error checking auth status", error);
            set({ authUser: null, isCheckingAuth: false });
        }
    }
}));