import { persist } from "zustand/middleware";
import { create } from "zustand";
import axiosInstance from "../axios";

export const useAuthSlice = create(
    persist(
        (set, get) => ({
            userData: null,
            login: (userData) =>
                axiosInstance.post("/api/user/login", userData),
            updateUserData: (userData) => set({ userData }),
        }),
        {
            name: "app-state", // name of the item in the storage (must be unique)
        }
    )
);
