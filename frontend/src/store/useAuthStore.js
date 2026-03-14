import {create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: {name: "John Doe", _id: "12345"},
    isLoading: false,
    isLoggedIn: false,

    login: () => {
        console.log("Logging in...");
        set({isLoggedIn : true})
    },
}));