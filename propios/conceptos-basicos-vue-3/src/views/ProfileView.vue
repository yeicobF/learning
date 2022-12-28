<script setup>
import { ProtectedRoute } from "@/components/ProtectedRoutes";
import { useUser } from "@/composables/useUser";
import { computed } from "vue";

const { user, fullName, dashboardStatus, registerDate, roles, isLoading } =
  useUser();

const details = computed(() => [
  { label: "Fecha de registro", value: registerDate.value },
  { label: "Dashboard status", value: dashboardStatus.value },
  { label: "Roles", value: roles.value },
]);
</script>

<template>
  <ProtectedRoute>
    <h1>Mi perfil</h1>
    <article>
      <header>
        <hgroup>
          <h2 :aria-busy="isLoading">{{ fullName }}</h2>
          <span>{{ user?.email }}</span>
        </hgroup>
      </header>
      <!-- <template v-for="{ label, value } in details" :key="value"> -->
      <!-- <details v-if="Array.isArray(value)">
          <summary>
            <strong>{{ label }}</strong>
          </summary>
          <ul>
            <li v-for="item in value" :key="item">
              {{ item }}
            </li>
          </ul>
        </details> -->
      <div v-for="{ label, value } in details" :key="value">
        <span>{{ label }}: </span>
        <strong v-if="!Array.isArray(value)">
          {{ value }}
        </strong>
        <ul v-else>
          <li v-for="item in value" :key="item">
            <small>{{ item }}</small>
          </li>
        </ul>
      </div>
      <!-- </template> -->
    </article>
  </ProtectedRoute>
</template>
