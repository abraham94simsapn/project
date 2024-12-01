<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Product Management -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Product Management</h2>
        <form @submit.prevent="handleProductSubmit" class="space-y-4">
          <FormInput
            id="productName"
            label="Product Name"
            v-model="productForm.formData.name"
            :error="productForm.errors.name"
          />
          <FormInput
            id="productDescription"
            label="Description"
            v-model="productForm.formData.description"
            :error="productForm.errors.description"
          />
          <FormInput
            id="productPrice"
            label="Price"
            type="number"
            v-model="productForm.formData.price"
            :error="productForm.errors.price"
          />
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              v-model="productForm.formData.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          <FormInput
            id="productImage"
            label="Image URL"
            v-model="productForm.formData.imageUrl"
            :error="productForm.errors.imageUrl"
          />
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {{ editingProduct ? 'Update Product' : 'Add Product' }}
          </button>
        </form>
      </div>

      <!-- Product List -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Product List</h2>
        <div class="space-y-4">
          <div
            v-for="product in products"
            :key="product.id"
            class="flex items-center justify-between p-4 border rounded"
          >
            <div>
              <h3 class="font-semibold">{{ product.name }}</h3>
              <p class="text-sm text-gray-600">${{ product.price }}</p>
            </div>
            <div class="flex gap-2">
              <button
                @click="editProduct(product)"
                class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                @click="deleteProduct(product.id)"
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useProductStore } from '../stores/products';
import { useForm } from '../composables/useForm';
import FormInput from '../components/ui/FormInput.vue';
import type { Product } from '../types';

const productStore = useProductStore();
const products = computed(() => productStore.products);
const categories = computed(() => productStore.categories);

const editingProduct = ref<Product | null>(null);

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
}

const productForm = useForm<ProductFormData>({
  name: '',
  description: '',
  price: '',
  category: categories.value[0],
  imageUrl: ''
});

const handleProductSubmit = () => {
  if (!productForm.validate()) return;

  const productData = {
    name: productForm.formData.value.name,
    description: productForm.formData.value.description,
    price: parseFloat(productForm.formData.value.price),
    category: productForm.formData.value.category,
    imageUrl: productForm.formData.value.imageUrl
  };

  if (editingProduct.value) {
    productStore.updateProduct({ ...productData, id: editingProduct.value.id });
  } else {
    productStore.addProduct(productData);
  }

  productForm.resetForm();
  editingProduct.value = null;
};

const editProduct = (product: Product) => {
  editingProduct.value = product;
  productForm.formData.value = {
    name: product.name,
    description: product.description,
    price: product.price.toString(),
    category: product.category,
    imageUrl: product.imageUrl
  };
};

const deleteProduct = (id: number) => {
  if (confirm('Are you sure you want to delete this product?')) {
    productStore.deleteProduct(id);
  }
};
</script>