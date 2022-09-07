import { acceptHMRUpdate, defineStore } from "pinia";
import cartItems from "@/data/cart.json";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: cartItems,
    };
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
