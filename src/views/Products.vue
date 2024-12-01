<template>
  <div>
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-3xl font-bold">Products</h1>
      <div class="flex gap-4">
        <select
          v-model="selectedCategory"
          class="px-4 py-2 border rounded-md"
        >
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="px-4 py-2 border rounded-md"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProductStore } from '../stores/products';
import { useCartStore } from '../stores/cart';
import ProductCard from '../components/ProductCard.vue';
import type { Product } from '../types';

const productStore = useProductStore();
const cartStore = useCartStore();

const searchQuery = ref('');
const selectedCategory = ref('');

const filteredProducts = computed(() => {
  return productStore.products
    .filter(product => 
      (!selectedCategory.value || product.category === selectedCategory.value) &&
      (!searchQuery.value || 
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
});

const categories = computed(() => productStore.categories);

const addToCart = (product: Product) => {
  cartStore.addToCart(product);
};
</script>