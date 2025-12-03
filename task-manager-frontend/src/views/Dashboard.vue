<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">
      Welcome, {{ userStore.user?.name }} 👋
    </h1>

    <LogoutButton />

    <TaskList />
  </div>
</template>

<script setup>
import TaskList from "../components/tasks/TaskList.vue";
import { useUserStore } from "../stores/user";
import LogoutButton from "../components/LogoutButton.vue";

const userStore = useUserStore();
</script>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.dashboard-title {
  font-size: 1.875rem; /* text-2xl */
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  color: #111827;
}

.logout-button {
  display: block;
  margin: 0 auto 2rem;
}

@media (max-width: 640px) {
  .dashboard-container {
    padding: 1rem;
  }
  .dashboard-title {
    font-size: 1.5rem;
  }
}
</style>
