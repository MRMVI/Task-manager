<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <BaseInput
        v-model="form.email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        :error="errors.email"
      />
      
      <BaseInput
        v-model="form.password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        :error="errors.password"
      />
      
      <div v-if="error" class="error">{{ error }}</div>
      <BaseButton type="submit" :disabled="!isFormValid">Login</BaseButton>
    </form>
    <div class="go-back-container">
      <GoBack />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from "vue";
import BaseInput from "../../components/ui/BaseInput.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import GoBack from "../../components/GoBack.vue";
import { useFormValidation } from "../../composables/useFormValidation";
import api from "../../plugins/axios"; 
import { useUserStore } from "../../stores/user";
import { useRouter } from "vue-router";

// Form state
const form = reactive({
  email: "",
  password: "",
});

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Setup form validation using composable
const { errors, validate: validateForm } = useFormValidation(form, {
  email: [
    { check: () => form.email.trim(), message: "Email is required." },
    { check: () => emailRegex.test(form.email), message: "Please enter a valid email address." }
  ],
  password: [
    { check: () => form.password.trim(), message: "Password is required." },
    { check: () => form.password.length >= 6, message: "Password must be at least 6 characters." }
  ]
});

// Backend error message
const error = ref("");

const userStore = useUserStore();
const router = useRouter();

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return (
    form.email.trim() &&
    emailRegex.test(form.email) &&
    form.password.trim() &&
    form.password.length >= 6
  );
});

// Watch form for real-time validation
watch(
  () => ({ email: form.email, password: form.password }),
  () => {
    validateForm();
  },
  { deep: true }
);

// Handle login
const handleLogin = async () => {
  // Validate form before making request
  if (!validateForm()) {
    return;
  }

  error.value = "";

  try {
    const { data } = await api.post("/login", {
      email: form.email,
      password: form.password,
    });

    console.log(data.message);

    // Store user info and token in Pinia
    userStore.setUser(data.user, data.token);

    // Reset form
    form.email = "";
    form.password = "";

    router.push("/dashboard");
  } catch (err) {
    if (err.response) {
      const resData = err.response.data;
      if (err.response.status === 422 && resData.errors) {
        // Use line breaks for better display
        error.value = Object.values(resData.errors).flat().join("\n");
      } else if (resData.message) {
        error.value = resData.message;
      } else {
        error.value = `Error: ${err.response.status} ${err.response.statusText}`;
      }
    } else {
      error.value = "Network error or server is not responding.";
    }
  }
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: var(--color-background);
  color: var(--color-text-main);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--color-text-main);
}

.login-form {
  display: flex;
  flex-direction: column;
}

.error {
  color: #dc2626;
  background-color: #fee2e2;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border-left: 4px solid #dc2626;
  white-space: pre-line;
}

.go-back-container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}
</style>

