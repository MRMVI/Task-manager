<template>
  <div class="input-group">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="['base-input', { 'input-error': error }]"
    />
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  modelValue: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  label: String,
  error: String,
});

const emit = defineEmits(["update:modelValue"]);

const { modelValue, type, placeholder, label, error } = toRefs(props);
</script>

<style scoped>
.base-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  color: var(--color-text-main);
  background-color: var(--color-background);
  transition: border-color 0.3s ease;
}

.base-input:focus {
  outline: none;
  border-color: var(--color-button-bg);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.base-input.input-error {
  border-color: #dc2626;
  background-color: #fef2f2;
}

.base-input.input-error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.input-group {
  margin-bottom: 1rem;
  color: var(--color-text-main);
}

.error-message {
  display: block;
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  font-weight: 500;
}
</style>
