<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-3xl font-bold text-center mb-8">Register</h2>
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
      <FormInput
        id="confirmPassword"
        label="Confirm Password"
        v-model="formData.confirmPassword"
        type="password"
        :error="errors.confirmPassword"
      />
      <div v-if="registerError" class="text-red-600 mb-4">
        {{ registerError }}
      </div>
      <button
        type="submit"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Registering...' : 'Register' }}
      </button>
      <p class="mt-4 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-indigo-600 hover:text-indigo-500">
          Login here
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
const registerError = ref('');
const isLoading = ref(false);

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const { formData, errors, validate } = useForm<RegisterForm>({
  email: '',
  password: '',
  confirmPassword: ''
});

const handleSubmit = async () => {
  if (!validate()) return;
  
  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match';
    return;
  }

  try {
    isLoading.value = true;
    registerError.value = '';
    
    const response = await auth.register({
      email: formData.value.email,
      password: formData.value.password
    });
    
    localStorage.setItem('token', response.token);
    authStore.setUser(response.user);
    router.push('/products');
  } catch (error: any) {
    registerError.value = error.response?.data?.error || 'Registration failed. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>