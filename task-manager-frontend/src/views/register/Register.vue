<template>
  <div class="register-page">
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSubmit" class="register-form">
      <BaseInput
        v-model="form.username"
        label="Username"
        placeholder="Enter your username"
        :error="errors.username"
      />
      
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
      
      <BaseInput
        v-model="form.confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Re-enter your password"
        :error="errors.confirmPassword"
      />
      
      <div v-if="error" class="error">{{ error }}</div>
      <BaseButton type="submit" :disabled="!isFormValid">Sign Up</BaseButton>
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

// Form state
const form = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Setup form validation using composable
const { errors, validate: validateForm } = useFormValidation(form, {
  username: [
    { check: () => form.username.trim(), message: "Username is required." },
    { check: () => form.username.length >= 3, message: "Username must be at least 3 characters." }
  ],
  email: [
    { check: () => form.email.trim(), message: "Email is required." },
    { check: () => emailRegex.test(form.email), message: "Please enter a valid email address." }
  ],
  password: [
    { check: () => form.password.trim(), message: "Password is required." },
    { check: () => form.password.length >= 6, message: "Password must be at least 6 characters." }
  ],
  confirmPassword: [
    { check: () => form.confirmPassword.trim(), message: "Confirm Password is required." },
    { check: () => form.confirmPassword === form.password, message: "Passwords do not match." }
  ]
});

// Backend error message
const error = ref("");

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return (
    form.username.trim() &&
    form.username.length >= 3 &&
    form.email.trim() &&
    emailRegex.test(form.email) &&
    form.password.trim() &&
    form.password.length >= 6 &&
    form.confirmPassword.trim() &&
    form.confirmPassword === form.password
  );
});

// Watch form for real-time validation
watch(
  () => ({ 
    username: form.username, 
    email: form.email, 
    password: form.password, 
    confirmPassword: form.confirmPassword 
  }),
  () => {
    validateForm();
  },
  { deep: true }
);

// Form submission
const handleSubmit = async () => {
  // Validate form before making request
  if (!validateForm()) {
    return;
  }

  error.value = "";

  try {
    const { data } = await api.post("/register", {
      username: form.username,
      email: form.email,
      password: form.password,
      password_confirmation: form.confirmPassword,
    });

    alert(data.message);
    console.log("Registered user:", data.user);

    // Reset form
    form.username = "";
    form.email = "";
    form.password = "";
    form.confirmPassword = "";
  } catch (err) {
    if (err.response) {
      const resData = err.response.data;

      if (err.response.status === 422 && resData.errors) {
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
.register-page {
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

.register-form {
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
