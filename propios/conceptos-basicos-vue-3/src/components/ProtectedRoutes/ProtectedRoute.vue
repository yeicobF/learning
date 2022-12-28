<script setup>
import { useUser } from "@/composables/useUser";
import { watch } from "vue";
import { useRouter } from "vue-router";

const { user, isLoading, isValidating } = useUser();
const router = useRouter();

watch(
  user,
  (newUser) => {
    console.log({ user: user.value });
    console.log({ newUser });

    if (!newUser) {
      router.push("/login");
    }
  },
  { immediate: true }
);
</script>

<template>
  <span
    :aria-busy="isLoading || isValidating"
    v-if="isLoading || isValidating"
  ></span>
  <slot v-else />
</template>
