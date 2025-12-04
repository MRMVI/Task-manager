<template>
  <div class="welcome-container">
    <div class="welcome-content">
      <h1 class="welcome-title">Welcome to Task Manager</h1>
      <p class="welcome-subtitle">Organize your tasks, boost your productivity</p>
      
      <div class="button-group">
        <router-link to="/login" class="btn btn-login">
          Login
        </router-link>
        <router-link to="/register" class="btn btn-signup">
          Sign Up
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--color-background);
}

.welcome-content {
  text-align: center;
  color: var(--color-text-main);
  padding: 40px;
}

.welcome-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--color-text-main);
  animation: slideDown 0.6s ease-out;
}

.welcome-subtitle {
  font-size: 1.3rem;
  margin-bottom: 50px;
  color: var(--color-text-main);
  opacity: 0.8;
  animation: slideUp 0.6s ease-out 0.2s both;
}

.button-group {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  animation: slideUp 0.6s ease-out 0.4s both;
}

.btn {
  display: inline-block;
  padding: 14px 40px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-login {
  background-color: rgba(59, 130, 246, 0.2);
  color: var(--color-button-bg);
  border: 2px solid var(--color-button-bg);
}

.btn-login:hover {
  background-color: var(--color-button-bg);
  color: var(--color-button-text);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.btn-signup {
  background-color: var(--color-button-bg);
  color: var(--color-button-text);
  border: 2px solid var(--color-button-bg);
}

.btn-signup:hover {
  background-color: var(--color-button-hover);
  color: var(--color-button-text);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);
}


@media (max-width: 768px) {
  .welcome-container {
    padding: 1rem;
  }

  .welcome-content {
    padding: 20px;
    width: 100%;
    max-width: 100%;
  }

  .welcome-title {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  .welcome-subtitle {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }

  .button-group {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 280px;
    padding: 12px 30px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .welcome-title {
    font-size: 2rem;
    margin-bottom: 12px;
  }

  .welcome-subtitle {
    font-size: 1rem;
    margin-bottom: 25px;
  }

  .btn {
    width: 100%;
    max-width: 250px;
    padding: 12px 25px;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
  }
}
</style>
