<template>
  <button class="go-back-btn" @click="handleGoBack">
    ← Go Back
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleGoBack = () => {
  router.push('/');
};
</script>

<style scoped>
.go-back-btn {
  padding: 10px 20px;
  background-color: var(--color-button-bg);
  color: var(--color-button-text);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.go-back-btn:hover {
  background-color: var(--color-button-hover);
  transform: translateX(-3px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.go-back-btn:active {
  transform: translateX(-1px);
}
</style>
