<template>
  <BaseButton @click="handleLogout">Logout</BaseButton>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import BaseButton from "./ui/BaseButton.vue";

const userStore = useUserStore();
const router = useRouter();

const handleLogout = async () => {
  await userStore.logout();
  router.push("/login");
};
</script>
