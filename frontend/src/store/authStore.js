import { create } from "zustand";
import axiosInstance from "../config/axiosConfig";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token"),
  isLoading: false,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
    // Token is automatically handled by axios interceptor
  },

  register: async (userData) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/auth/register", userData);
      const { token, user } = response.data;

      get().setToken(token);
      set({ user, isLoading: false });
      toast.success("Registration successful!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      set({ isLoading: false });
      return false;
    }
  },

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      const { token, user } = response.data;

      get().setToken(token);
      set({ user, isLoading: false });
      toast.success("Login successful!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      set({ isLoading: false });
      return false;
    }
  },

  loadUser: async () => {
    const token = get().token;
    if (!token) return;

    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/auth/me");
      set({ user: response.data, isLoading: false });
    } catch (error) {
      console.error("Load user error:", error);
      get().logout();
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
    toast.success("Logged out successfully");
  },

  updateProfile: async (userData) => {
    set({ isLoading: true });
    try {
      const formData = new FormData();
      Object.keys(userData).forEach((key) => {
        if (userData[key]) {
          formData.append(key, userData[key]);
        }
      });

      const response = await axiosInstance.put("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set({ user: response.data.user, isLoading: false });
      toast.success("Profile updated successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      set({ isLoading: false });
      return false;
    }
  },
}));

