import { create } from "zustand";

export const useStore = create((set) => ({
  theme: localStorage.getItem("themeBlogMern") || "dark",
  user: JSON.parse(localStorage.getItem("userBlogMERN")) || {},
  setUser: () => set((user) => ({ user: user })),
  setTheme: (theme) => set((state) => ({ theme: theme })),
  sighOut : ()=> set((state)=> ({user:{}}))
}));
