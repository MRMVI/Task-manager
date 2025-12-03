<template>
  <div class="input-group">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="base-input"
    />
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
});

const emit = defineEmits(["update:modelValue"]);

const { modelValue, type, placeholder, label } = toRefs(props);
</script>

<style scoped>
.base-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}
.input-group {
  margin-bottom: 1rem;
}
</style>
