<template>
  <div class="register-page">
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSubmit" class="register-form">
      <BaseInput
        v-model="form.username"
        label="Username"
        placeholder="Enter your username"
      />
      <BaseInput
        v-model="form.email"
        type="email"
        label="Email"
        placeholder="Enter your email"
      />
      <BaseInput
        v-model="form.password"
        type="password"
        label="Password"
        placeholder="Enter your password"
      />
      <BaseInput
        v-model="form.confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Re-enter your password"
      />
      <div v-if="error" class="error">{{ error }}</div>
      <BaseButton type="submit">Sign Up</BaseButton>
    </form>
    <div class="go-back-container">
      <GoBack />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import BaseInput from "../../components/ui/BaseInput.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import GoBack from "../../components/GoBack.vue";
import api from "../../plugins/axios";


// Reactive form state
const form = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

// Error message
const error = ref("");

// Form submission
const handleSubmit = async () => {
  // Basic validation
  if (!form.username || !form.email || !form.password || !form.confirmPassword) {
    error.value = "Please fill in all fields.";
    return;
  }
  if (form.password !== form.confirmPassword) {
    error.value = "Passwords do not match.";
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
  color: red;
  margin-bottom: 1rem;
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
