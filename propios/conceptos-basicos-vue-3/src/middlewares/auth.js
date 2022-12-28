import { redirectRoutes } from "@/constants/router";
import { authService } from "@/services/auth";

const authenticateUserSession = async (to) => {
  if (!to?.meta?.requiresAuth) return true;

  let isUserLoggedIn = false;

  try {
    const user = await authService.authenticateUserSession();

    console.info({ user });

    isUserLoggedIn = authService.isUserLoggedIn(user);
  } catch (error) {
    console.error(error);
  }

  if (!isUserLoggedIn) {
    return redirectRoutes.login;
  }
};

const redirectIfLoggedIn = async (to, from) => {
  if (!to?.meta?.redirectIfLoggedIn) return true;

  let isUserLoggedIn = false;

  try {
    const user = await authService.authenticateUserSession();

    isUserLoggedIn = authService.isUserLoggedIn(user);
  } catch (error) {
    console.error(error);
  }

  if (isUserLoggedIn) {
    return from ?? redirectRoutes.home;
  }
};

export { authenticateUserSession, redirectIfLoggedIn };
