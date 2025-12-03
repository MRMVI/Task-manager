<template>
  <div class="add-task">
    <h2>Add Task</h2>

    <input 
      v-model="title" 
      placeholder="Task title"
      class="input-field"
    />

    <textarea 
      v-model="description" 
      placeholder="Description"
      class="input-field"
    />

    <button @click="submit" class="btn-primary">Add Task</button>

    <p v-if="taskStore.error" class="error">{{ taskStore.error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../../stores/tasks";

const title = ref("");
const description = ref("");
const taskStore = useTaskStore();

const submit = async () => {
  if (!title.value.trim()) return;

  await taskStore.addTask({
    title: title.value,
    description: description.value
  });

  title.value = "";
  description.value = "";
};
</script>

<style scoped>
.add-task {
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.input-field {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.btn-primary {
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
