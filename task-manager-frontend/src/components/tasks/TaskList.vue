<template>
  <div>
    <TaskForm />

    <!-- Loading state -->
    <div v-if="taskStore.loading" class="text-center py-4">
      Loading tasks...
    </div>

    <!-- Error state -->
    <div v-if="taskStore.error" class="text-red-500 py-2">
      {{ taskStore.error }}
    </div>

    <!-- Empty tasks -->
    <div v-if="!taskStore.loading && taskStore.tasks.length === 0" class="text-gray-500 py-2">
      No tasks yet. Add your first task!
    </div>

    <!-- Task items -->
    <div v-else>
      <TaskItem
        v-for="task in taskStore.tasks"
        :key="task.id"
        :task="task"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useTaskStore } from "../../stores/tasks";
import TaskForm from "./TaskForm.vue";
import TaskItem from "./TaskItem.vue";

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.fetchTasks();
});
</script>

<style scoped>
.text-center {
  text-align: center;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.text-red-500 {
  color: #f87171;
}
.text-gray-500 {
  color: #6b7280;
}
</style>
