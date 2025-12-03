<template>
  <nav class="navigation">
    <router-link to="/login" class="nav-link">Sign In</router-link>
    <router-link to="/register" class="nav-link">Sign Up</router-link>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Optional: track active link
const activeRoute = ref(route.path);

router.afterEach((to) => {
  activeRoute.value = to.path;
});
</script>

<style scoped>
.navigation {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 2rem;
  background-color: #1d4ed8;
}

.nav-link {
  color: white;
  margin-left: 1rem;
  text-decoration: none;
  font-weight: bold;
}

.nav-link.router-link-active {
  text-decoration: underline;
}
</style>
