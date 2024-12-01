<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img :src="product.imageUrl" :alt="product.name" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ product.name }}</h3>
      <p class="text-gray-600 text-sm mb-2">{{ product.description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-lg font-bold">${{ product.price }}</span>
        <button
          @click="$emit('addToCart', product)"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types';

defineProps<{
  product: Product;
}>();

defineEmits<{
  addToCart: [product: Product];
}>();
</script>