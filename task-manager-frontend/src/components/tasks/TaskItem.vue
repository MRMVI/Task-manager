<template>
  <div 
    class="task-item" 
    :class="{ done: task.status === 'done' }"
  >
    <div class="task-info">
      <template v-if="!isEditing">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <span class="status">{{ task.status }}</span>
      </template>

      <template v-else>
        <input v-model="localTitle" class="edit-title" />
        <textarea v-model="localDescription" class="edit-desc" />
      </template>
    </div>

    <div class="task-actions">
      <template v-if="!isEditing">
        <button @click="toggleStatus" class="action-btn">
          {{ task.status === 'pending' ? 'Mark Done' : 'Undo' }}
        </button>
        <button @click="startEdit" class="action-btn">Edit</button>
        <button @click="remove" class="delete-btn">Delete</button>
      </template>

      <template v-else>
        <button @click="saveEdit" class="action-btn save-btn">Save</button>
        <button @click="cancelEdit" class="action-btn">Cancel</button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from "../../stores/tasks";

const props = defineProps({
  task: { type: Object, required: true }
});

const taskStore = useTaskStore();

const isEditing = ref(false);
const localTitle = ref('');
const localDescription = ref('');

const startEdit = () => {
  isEditing.value = true;
  localTitle.value = props.task.title || '';
  localDescription.value = props.task.description || '';
};

const cancelEdit = () => {
  isEditing.value = false;
};

const saveEdit = async () => {
  const title = (localTitle.value || '').trim();
  if (!title) return; // don't allow empty title

  await taskStore.editTask(props.task.id, {
    title,
    description: localDescription.value,
  });

  isEditing.value = false;
};

const toggleStatus = () => {
  // Prevent toggling while editing
  if (isEditing.value) return;
  taskStore.editTask(props.task.id, {
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

.edit-title {
  width: 100%;
  padding: 0.4rem;
  margin-bottom: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

.edit-desc {
  width: 100%;
  padding: 0.4rem;
  min-height: 60px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  margin-bottom: 0.5rem;
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
