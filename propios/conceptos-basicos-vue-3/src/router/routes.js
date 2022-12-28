import HomeView from "@/views/HomeView.vue";
import { ProtectedRoute } from "@/components/ProtectedRoutes";

export const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/counter",
    name: "Counter",
    component: () => import("@/views/CounterView.vue"),
  },
  // {
  //   path: "/profile",
  //   name: "Profile",
  //   component: () => import("@/views/ProfileView.vue"),
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
    meta: {
      redirectIfLoggedIn: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/ProfileView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //   component: ProtectedRoute,
  //   children: [
  //     {
  //       path: "/profile",
  //       name: "Profile",
  //       component: () => import("@/views/ProfileView.vue"),
  //       meta: {
  //         requiresAuth: true,
  //       },
  //     },
  //   ],
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
];
