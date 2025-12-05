// stores/user.js
import { defineStore } from "pinia";
import api from "../plugins/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setUser(user, token) {
      this.user = user;
      this.token = token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    async logout() {
      try {
        if (this.token) {
          await api.post("/logout"); // backend logout
        }
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
        this.user = null;
        this.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isGuest"); // Ensure guest flag is cleared
      }
    },
  },
});
