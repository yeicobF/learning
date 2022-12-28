<script setup>
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

defineProps({
  id: {
    type: String,
    default: "default",
  },
});

const counterStore = useCounterStore();
const { count, doubleCount } = storeToRefs(counterStore);
const { increment } = counterStore;
</script>

<template>
  <article>
    <header>
      <h2>
        Counter <strong>{{ id }}</strong>
      </h2>
    </header>

    <p><strong>Count:</strong> {{ count }}</p>
    <p>
      <strong>Double count <i>(computed)</i>:</strong> {{ doubleCount }}
    </p>

    <footer>
      <button @click="increment">Increment</button>
    </footer>
  </article>
</template>
