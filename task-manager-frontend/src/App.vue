<template>
  <Navigation />
  <router-view />
</template>

<script setup>
import Navigation from "./layouts/Navigation.vue";

import { useUserStore } from "./stores/user";

const userStore = useUserStore();



</script>
