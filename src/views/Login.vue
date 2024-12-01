<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-3xl font-bold text-center mb-8">Login</h2>
    <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md">
      <FormInput
        id="email"
        label="Email"
        v-model="formData.email"
        type="email"
        :error="errors.email"
      />
      <FormInput
        id="password"
        label="Password"
        v-model="formData.password"
        type="password"
        :error="errors.password"
      />
      <div v-if="loginError" class="text-red-600 mb-4">
        {{ loginError }}
      </div>
      <button
        type="submit"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/register" class="text-indigo-600 hover:text-indigo-500">
          Register here
        </router-link>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useForm } from '../composables/useForm';
import FormInput from '../components/ui/FormInput.vue';
import { auth } from '../api';

const router = useRouter();
const authStore = useAuthStore();
const loginError = ref('');
const isLoading = ref(false);

interface LoginForm {
  email: string;
  password: string;
}

const { formData, errors, validate } = useForm<LoginForm>({
  email: '',
  password: ''
});

const handleSubmit = async () => {
  if (!validate()) return;
  
  try {
    isLoading.value = true;
    loginError.value = '';
    
    const response = await auth.login(formData.value.email, formData.value.password);
    
    localStorage.setItem('token', response.token);
    authStore.setUser(response.user);
    router.push('/products');
  } catch (error: any) {
    loginError.value = error.response?.data?.error || 'Login failed. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>