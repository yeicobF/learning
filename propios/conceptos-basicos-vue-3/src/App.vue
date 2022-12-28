<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";

const navLinks = [
  {
    text: "Home",
    to: "/",
  },
  {
    text: "About",
    to: "/about",
  },
  {
    text: "Counter",
    to: "/counter",
  },
  {
    text: "404",
    to: "/inexistent-route",
  },
];
</script>

<template>
  <Header :navLinks="navLinks" />

  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped></style>
