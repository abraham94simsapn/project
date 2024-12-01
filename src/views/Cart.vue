<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Shopping Cart</h1>
    
    <div v-if="cartStore.items.length === 0" class="text-center py-8">
      <p class="text-gray-600">Your cart is empty</p>
      <router-link
        to="/products"
        class="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
      >
        Browse Products
      </router-link>
    </div>

    <div v-else>
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div v-for="item in cartStore.items" :key="item.product.id" class="flex items-center py-4 border-b">
          <img :src="item.product.imageUrl" :alt="item.product.name" class="w-20 h-20 object-cover rounded" />
          <div class="ml-4 flex-grow">
            <h3 class="font-semibold">{{ item.product.name }}</h3>
            <p class="text-gray-600">${{ item.product.price }}</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center">
              <button
                @click="updateQuantity(item.product.id, Math.max(0, item.quantity - 1))"
                class="px-2 py-1 border rounded"
              >
                -
              </button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button
                @click="updateQuantity(item.product.id, item.quantity + 1)"
                class="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>
            <button
              @click="removeFromCart(item.product.id)"
              class="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between mb-4">
          <span class="font-semibold">Total:</span>
          <span class="font-bold">${{ cartStore.total.toFixed(2) }}</span>
        </div>
        <button
          @click="checkout"
          class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          :disabled="!canCheckout"
        >
          Checkout
        </button>
        <p v-if="!canCheckout" class="text-red-600 text-sm mt-2">
          Insufficient balance
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const canCheckout = computed(() => {
  return (authStore.user?.balance || 0) >= cartStore.total;
});

const updateQuantity = (productId: number, quantity: number) => {
  if (quantity === 0) {
    removeFromCart(productId);
  } else {
    cartStore.updateQuantity(productId, quantity);
  }
};

const removeFromCart = (productId: number) => {
  cartStore.removeFromCart(productId);
};

const checkout = () => {
  if (!canCheckout.value) return;
  
  // Simulate checkout process
  if (authStore.user) {
    authStore.setUser({
      ...authStore.user,
      balance: authStore.user.balance - cartStore.total
    });
    cartStore.items.length = 0;
    router.push('/products');
  }
};
</script>