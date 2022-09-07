import { acceptHMRUpdate, defineStore } from "pinia";
import cartItems from "@/data/cart.json";
import type { CartItem, Uid } from "@/types";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [] as CartItem[],
    };
  },
  actions: {
    // Solución profesor.
    addItem(itemId: Uid, count: number) {
      const item = this.items.find((item) => item.id === itemId);

      if (item) {
        item.count += count;
      } else {
        this.items.push({ id: itemId, count });
      }
    },
    /* ---------------------- Mi intento de implementación ---------------------- */
    // addItem({ id: itemId, count }: CartItem) {
    //   this.items.push({
    //     id: itemId,
    //     count,
    //   });
    // },
  },
  getters: {
    // Implementación con arrow function del número de elementos
    count: (state) => {
      return state.items.reduce(
        (accumulator, item) => accumulator + item.count,
        0,
      );
    },
    // Implementación sin arrow function
    numberOfItems(): number {
      return this.items.reduce(
        (accumulator, item) => accumulator + item.count,
        0,
      );
    },
    isEmpty(): boolean {
      return this.count === 0;
      // return this.numberOfItems === 0;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
