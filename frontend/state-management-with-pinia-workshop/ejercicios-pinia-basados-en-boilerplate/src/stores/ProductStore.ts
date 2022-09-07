import { acceptHMRUpdate, defineStore } from "pinia";
// import products from "@/data/products.json";
import type { Product } from "@/types";

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return { products: [] as Product[] };
  },
  actions: {
    async fill() {
      const res = await fetch("/data/products.json");
      this.products = await res.json();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
