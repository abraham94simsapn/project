import { ref } from 'vue';

export function useForm<T extends object>(initialState: T) {
  const formData = ref<T>({ ...initialState });
  const errors = ref<Partial<Record<keyof T, string>>>({});

  const resetForm = () => {
    formData.value = { ...initialState };
    errors.value = {};
  };

  const validateField = (field: keyof T, value: any): string => {
    if (!value && value !== 0) return 'This field is required';
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Invalid email format';
    }
    if (field === 'password' && value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.entries(formData.value).forEach(([key, value]) => {
      const error = validateField(key as keyof T, value);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });

    errors.value = newErrors;
    return isValid;
  };

  return {
    formData,
    errors,
    resetForm,
    validate
  };
}