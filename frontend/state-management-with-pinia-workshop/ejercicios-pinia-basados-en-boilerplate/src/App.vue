<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/ProductStore";
import { storeToRefs } from "pinia";

// const productStore = useProductStore();

// Products state with destructuring
const { products } = storeToRefs(useProductStore());
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <!-- Products State without destructuring -->
      <!-- <ProductCard
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
      /> -->

      <!-- Products State with Destructuring -->
      <h2>Products State with Destructuring</h2>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </ul>
  </div>
</template>
