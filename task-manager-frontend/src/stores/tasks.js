import { defineStore } from "pinia";
import { getTasks, addTask, updateTask, deleteTask } from "../api/taskService";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchTasks() {
      this.loading = true;
      this.error = null;
      try {
        const tasks = await getTasks();
        this.tasks = tasks;
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        this.error = "Failed to fetch tasks.";
      } finally {
        this.loading = false;
      }
    },

    async addTask(data) {
      this.error = null;
      // Optimistic update: add to UI first
      const tempId = Date.now(); // temporary ID
      const tempTask = { id: tempId, ...data, status: "pending", created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      this.tasks.unshift(tempTask);

      try {
        const task = await addTask(data);
        // Ensure task has an id before replacing
        if (!task || !task.id) {
          console.error('API returned invalid task:', task);
          // Keep the temp task if response is invalid
          return;
        }
        // Replace temp task with server response
        const index = this.tasks.findIndex(t => t.id === tempId);
        if (index !== -1) this.tasks[index] = task;
      } catch (err) {
        console.error("Failed to add task:", err);
        this.error = "Failed to add task.";
        // Remove the temp task if request fails
        this.tasks = this.tasks.filter(t => t.id !== tempId);
      }
    },

    async editTask(id, data) {
      this.error = null;
      const index = this.tasks.findIndex(t => t.id === id);
      if (index === -1) return;

      const originalTask = { ...this.tasks[index] };
      // Optimistic update
      this.tasks[index] = { ...this.tasks[index], ...data };

      try {
        const task = await updateTask(id, data);
        this.tasks[index] = task;
      } catch (err) {
        console.error("Failed to update task:", err);
        this.error = "Failed to update task.";
        // Revert if fails
        this.tasks[index] = originalTask;
      }
    },

    async removeTask(id) {
      this.error = null;
      const index = this.tasks.findIndex(t => t.id === id);
      if (index === -1) return;

      const removedTask = this.tasks.splice(index, 1)[0]; // optimistic remove

      try {
        await deleteTask(id);
      } catch (err) {
        console.error("Failed to delete task:", err);
        this.error = "Failed to delete task.";
        // Revert if fails
        this.tasks.splice(index, 0, removedTask);
      }
    },
  },
});
