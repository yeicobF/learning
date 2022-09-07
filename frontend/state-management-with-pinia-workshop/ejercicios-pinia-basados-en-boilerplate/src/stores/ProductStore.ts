import { acceptHMRUpdate, defineStore } from "pinia";
import products from "@/data/products.json";

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return { products };
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
