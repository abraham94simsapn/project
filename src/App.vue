<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex items-center">
              <span class="text-xl font-bold">Clothing Store</span>
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/products" class="text-gray-700 hover:text-gray-900">Products</router-link>
            <router-link v-if="isAuthenticated" to="/cart" class="text-gray-700 hover:text-gray-900">Cart</router-link>
            <router-link v-if="isAdmin" to="/admin" class="text-gray-700 hover:text-gray-900">Admin</router-link>
            <template v-if="isAuthenticated">
              <span class="text-gray-700">Balance: ${{ user?.balance }}</span>
              <button @click="logout" class="text-gray-700 hover:text-gray-900">Logout</button>
            </template>
            <template v-else>
              <router-link to="/login" class="text-gray-700 hover:text-gray-900">Login</router-link>
              <router-link to="/register" class="text-gray-700 hover:text-gray-900">Register</router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 px-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
const isAdmin = computed(() => authStore.user?.role === 'admin');

const logout = () => {
  authStore.logout();
};
</script>