<template>
  <button
    :type="type"
    :disabled="disabled"
    class="base-button"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);
</script>

<style scoped>
.base-button {
  padding: 0.5rem 1rem;
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.base-button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}
</style>
