// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');

// Listen for localStorage changes in other tabs
const STORAGE_KEY = 'fitwear_products';
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    try {
      const newProducts = JSON.parse(e.newValue);
      if (newProducts) {
        // import the store and patch it
        const { useProductStore } = require('./store/productStore.js');
        const store = useProductStore(pinia);
        store.$patch({ products: newProducts });
      }
    } catch (_) {
      // ignore invalid JSON
    }
  }
});
