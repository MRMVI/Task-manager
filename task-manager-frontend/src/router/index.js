// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/Login.vue";
import Register from "../views/register/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import { useUserStore } from "../stores/user";

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, // protect route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard
// Global navigation guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // Prevent unauthenticated access to protected pages
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return next({ path: "/login", query: { redirect: to.fullPath } });
  }

  // Prevent logged-in users from visiting login/register
  if ((to.path === "/login" || to.path === "/register") && userStore.isAuthenticated) {
    return next("/dashboard");
  }

  next();
});


export default router;
