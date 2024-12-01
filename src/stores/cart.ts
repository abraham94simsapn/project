import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CartItem, Product } from '../types';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  const total = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
  });

  function addToCart(product: Product) {
    const existingItem = items.value.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({ product, quantity: 1 });
    }
  }

  function removeFromCart(productId: number) {
    items.value = items.value.filter(item => item.product.id !== productId);
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  return {
    items,
    total,
    addToCart,
    removeFromCart,
    updateQuantity
  };
});