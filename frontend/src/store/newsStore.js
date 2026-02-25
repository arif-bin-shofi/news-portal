import { create } from "zustand";
import axiosInstance from "../config/axiosConfig";
import toast from "react-hot-toast";

export const useNewsStore = create((set, get) => ({
  news: [],
  topNews: [],
  singleNews: null,
  userNews: [],
  isLoading: false,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalNews: 0,
  },

  fetchNews: async (page = 1, category = "") => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(
        `/news?page=${page}&category=${category}`,
      );
      set({
        news: response.data.news,
        pagination: {
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalNews: response.data.totalNews,
        },
        isLoading: false,
      });
    } catch (error) {
      toast.error("Failed to fetch news");
      set({ isLoading: false });
    }
  },

  fetchTopNews: async () => {
    try {
      const response = await axiosInstance.get("/news/top");
      set({ topNews: response.data });
    } catch (error) {
      console.error("Fetch top news error:", error);
    }
  },

  fetchNewsById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/news/${id}`);
      set({ singleNews: response.data, isLoading: false });
    } catch (error) {
      toast.error("Failed to fetch news details");
      set({ isLoading: false });
    }
  },

  fetchUserNews: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/news/user/my-news");
      set({ userNews: response.data, isLoading: false });
    } catch (error) {
      toast.error("Failed to fetch your news");
      set({ isLoading: false });
    }
  },

  createNews: async (newsData) => {
    set({ isLoading: true });
    try {
      const formData = new FormData();
      Object.keys(newsData).forEach((key) => {
        if (newsData[key]) {
          formData.append(key, newsData[key]);
        }
      });

      const response = await axiosInstance.post("/news", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("News created successfully");
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      console.error("Create news error:", {
        status: error.response?.status,
        message: error.response?.data?.message,
        data: error.response?.data,
        error: error.message,
      });
      toast.error(error.response?.data?.message || "Failed to create news");
      set({ isLoading: false });
      return null;
    }
  },

  updateNews: async (id, newsData) => {
    set({ isLoading: true });
    try {
      const formData = new FormData();
      Object.keys(newsData).forEach((key) => {
        if (newsData[key]) {
          formData.append(key, newsData[key]);
        }
      });

      const response = await axiosInstance.put(`/news/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("News updated successfully");
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update news");
      set({ isLoading: false });
      return null;
    }
  },

  deleteNews: async (id) => {
    try {
      await axiosInstance.delete(`/news/${id}`);
      toast.success("News deleted successfully");

      // Update userNews list
      const userNews = get().userNews.filter((news) => news._id !== id);
      set({ userNews });

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete news");
      return false;
    }
  },
}));
