<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/ProductStore";
import { storeToRefs } from "pinia";
import { useCartStore } from "./stores/CartStore";

// Products state with destructuring
// const { products } = storeToRefs(useProductStore());
const productStore = useProductStore();

// const cartStore = useCartStore();
const { addItem } = useCartStore();

productStore.fill();
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
      <ProductCard
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
        @add-to-cart="addItem(product.id, $event)"
      />
    </ul>
  </div>
</template>
