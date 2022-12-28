<script setup>
import { useAuth } from "@/composables/useAuth";
import { useUser } from "@/composables/useUser";
import { computed, watch } from "vue";
import { useRouter } from "vue-router";

defineProps({
  navLinks: {
    type: Array,
    required: true,
  },
});

const { originalUser, user, error, name, isLoading, isValidating } = useUser();
const router = useRouter();

console.warn({ user: user.value });
const { logout } = useAuth();

const components = {
  loading: {
    component: "span",
    props: {
      "aria-busy": true,
    },
  },
  login: {
    component: "RouterLink",
    props: { to: "/login" },
    text: "Login",
  },
  profile: {
    component: "RouterLink",
    props: { to: "/profile" },
    text: name.value,
  },
  loggedIn: {
    component: "button",
    text: "Cerrar sesión",
    props: {
      type: "button",
    },
    onClick: async () =>
      logout().then(() => router.push("/").catch(console.error)),
  },
};

const authLink = computed(() => {
  const { profile, login, loading, loggedIn } = components;

  if (isLoading.value || isValidating.value) {
    return loading;
  }

  if (!user.value) {
    return login;
  }

  return loggedIn;
});

watch(
  originalUser,
  (newUser) => {
    console.log({ originalUser: originalUser.value });
    console.log({ newUser });
  },
  { immediate: true }
);

watch(error, (newError) => {
  console.log({ error: error.value });
  console.log({ newError });
});
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <img
            alt="Vue logo"
            class="logo"
            src="@/assets/logo.svg"
            width="50"
            height="50"
          />
        </li>
        <li v-for="{ text, to } in navLinks" :key="to">
          <RouterLink :to="to">{{ text }}</RouterLink>
        </li>
      </ul>
      <ul>
        <li>
          <span
            :aria-busy="isLoading || isValidating"
            v-if="isLoading || isValidating"
          ></span>
          <RouterLink to="/profile" v-else-if="user">
            <u>{{ name }}</u>
          </RouterLink>
        </li>
        <li>
          <button v-if="user" @click="logout">Cerrar sesión</button>
          <RouterLink to="/login" v-else>Login</RouterLink>
          <!-- <component
            :is="authLink.component"
            v-bind="authLink.props"
            @click="authLink?.onClick"
          >
            {{ authLink?.text }}
          </component> -->
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

/* nav a.router-link-exact-active:hover {
  background-color: transparent;
} */

/* nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
} */

nav a:first-of-type {
  border: 0;
}

nav ul {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }

  /* header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  } */
}
</style>
