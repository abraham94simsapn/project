import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '../types';

// Simulated product data
const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Classic T-Shirt',
    description: 'Comfortable cotton t-shirt',
    price: 19.99,
    category: 'T-Shirts',
    imageUrl: 'https://placehold.co/300x400'
  },
  {
    id: 2,
    name: 'Denim Jeans',
    description: 'Classic blue denim jeans',
    price: 49.99,
    category: 'Pants',
    imageUrl: 'https://placehold.co/300x400'
  },
  {
    id: 3,
    name: 'Hooded Sweatshirt',
    description: 'Warm and cozy hoodie',
    price: 39.99,
    category: 'Outerwear',
    imageUrl: 'https://placehold.co/300x400'
  }
];

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>(initialProducts);
  const categories = ref(['T-Shirts', 'Pants', 'Outerwear']);

  function addProduct(product: Omit<Product, 'id'>) {
    const newProduct = {
      ...product,
      id: Math.max(...products.value.map(p => p.id)) + 1
    };
    products.value.push(newProduct);
  }

  function updateProduct(updatedProduct: Product) {
    const index = products.value.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products.value[index] = updatedProduct;
    }
  }

  function deleteProduct(id: number) {
    products.value = products.value.filter(p => p.id !== id);
  }

  return {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct
  };
});