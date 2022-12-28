import {
  authenticateUserSession,
  redirectIfLoggedIn,
} from "@/middlewares/auth";

import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeResolve(authenticateUserSession);
router.beforeEach(redirectIfLoggedIn);

export default router;
