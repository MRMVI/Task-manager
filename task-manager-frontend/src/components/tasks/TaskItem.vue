<template>
  <div 
    class="task-item" 
    :class="{ done: task.status === 'done' }"
  >
    <div class="task-info">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
      <span class="status">{{ task.status }}</span>
    </div>

    <div class="task-actions">
      <button @click="toggleStatus">
        {{ task.status === 'pending' ? 'Mark Done' : 'Undo' }}
      </button>
      <button @click="remove" class="delete-btn">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../../stores/tasks";

const props = defineProps({
  task: { type: Object, required: true }
});

const taskStore = useTaskStore();

const toggleStatus = () => {
  taskStore.editTask(props.task.id, {
    ...props.task,
    status: props.task.status === "pending" ? "done" : "pending"
  });
};

const remove = () => taskStore.removeTask(props.task.id);
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s;
}

.task-item.done {
  background-color: #dcfce7;
}

.task-info h3 {
  margin: 0;
  font-weight: 600;
}

.task-info p {
  margin: 0.25rem 0;
  color: #4b5563;
}

.status {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  background-color: #fde68a;
  display: inline-block;
}

.task-item.done .status {
  background-color: #86efac;
}

.task-actions button {
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  cursor: pointer;
}

.delete-btn {
  background-color: #ef4444;
  color: white;
}

.delete-btn:hover {
  background-color: #b91c1c;
}

.task-actions button:hover:not(.delete-btn) {
  background-color: #e5e7eb;
}
</style>
