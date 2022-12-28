import { ACCESS_TOKEN } from "@/constants/auth";
import { API_URLS } from "@/constants/api";
import { transformObjectToFormData } from "@/utils/formData";

const { login: loginUrl, currentUser } = API_URLS;

const login = async ({ email, password } = {}) => {
  const formData = transformObjectToFormData({ user: email, password });

  const res = fetch(loginUrl, {
    method: "POST",
    body: formData,
  });

  return await res.then((res) => res.json());
};

const authenticateUserSession = async () => {
  const jwt = localStorage.getItem(ACCESS_TOKEN);

  if (!jwt) {
    throw new Error("No hay user o token en el localStorage");
  }

  const formData = transformObjectToFormData({ token: jwt });

  const res = fetch(currentUser, {
    method: "POST",
    body: formData,
  });

  return await res.then((res) => res.json());
};

const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

const isUserLoggedIn = (user) => user && !user?.error;

export const authService = {
  login,
  logout,
  authenticateUserSession,
  isUserLoggedIn,
};
