<template>
  <div class="dashboard-container">
    <div class="header-wrapper">
      <h1 class="dashboard-title">
        Welcome, {{ userStore.user?.name }} 👋
      </h1>
      <div v-if="isGuestMode" class="guest-badge">
        Guest Mode
      </div>
    </div>

    <LogoutButton />

    <TaskList />
  </div>
</template>

<script setup>
import TaskList from "../components/tasks/TaskList.vue";
import { useUserStore } from "../stores/user";
import LogoutButton from "../components/LogoutButton.vue";
import { computed } from "vue";

const userStore = useUserStore();

// Check if in guest mode
const isGuestMode = computed(() => {
  return localStorage.getItem("isGuest") === "true";
});
</script>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: var(--color-background);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.dashboard-title {
  font-size: 1.875rem; /* text-2xl */
  font-weight: 600;
  text-align: center;
  color: var(--color-text-main);
}

.guest-badge {
  display: inline-block;
  background-color: #fef3c7;
  color: #92400e;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid #fcd34d;
  white-space: nowrap;
}

.logout-button {
  display: block;
  margin: 0 auto 2rem;
}

@media (max-width: 640px) {
  .dashboard-container {
    padding: 1rem;
  }
  
  .header-wrapper {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .dashboard-title {
    font-size: 1.5rem;
  }
  
  .guest-badge {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
  }
}
</style>
