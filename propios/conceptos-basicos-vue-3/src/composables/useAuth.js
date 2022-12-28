import { ACCESS_TOKEN } from "@/constants/auth";
import { authService } from "@/services/auth";
import { ref } from "vue";

import { useUser } from "@/composables/useUser";
import { useLocalStorage } from "@vueuse/core";

export const useAuth = () => {
  const { mutateUser } = useUser();
  const accessToken = useLocalStorage(ACCESS_TOKEN, null);
  const isLoading = ref(false);

  const login = async ({ email, password } = {}) => {
    isLoading.value = true;

    const data = await authService
      .login({ email, password })
      .finally(() => (isLoading.value = false));

    const { jwt, usi: userId, usr: rolId } = data;

    if (!jwt) {
      throw new Error("Invalid credentials");
    }

    accessToken.value = jwt;

    await mutateUser();

    return { jwt, userId, rolId };
  };

  const logout = async () => {
    authService.logout();
    await mutateUser();
  };

  return {
    login,
    logout,
    isLoading,
  };
};
