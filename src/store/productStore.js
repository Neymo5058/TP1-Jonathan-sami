// src/store/productStore.js
import { defineStore } from 'pinia'

const STORAGE_KEY = 'fitwear_products'

export const useProductStore = defineStore('product', {
  state: () => ({
    // load from localStorage or fall back to initial list
    products: JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || [
      { id: 1, name: 'ProFit Bottle',    price:30,  quantity:50, image:'bottle.jpg' },
      { id: 2, name: 'Urban Cap 1',      price:40,  quantity:20, image:'cap1.jpg' },
      { id: 3, name: 'Urban Cap 2',      price:45,  quantity:30, image:'cap2.jpg' },
      { id: 4, name: 'Beach Volleyball Shorts', price:25, quantity:15, image:'tamara-bellis-BGmVdP6thkU-unsplash.jpg' },
      { id: 5, name: 'Running Shoe',     price:120, quantity:10, image:'vlad-ciutacu-tR2ZoPR4OPc-unsplash.jpg' },
      { id: 6, name: 'Argentina Jersey', price:45,  quantity:5,  image:'diego-castaneda-Mq532Dm-cbU-unsplash.jpg' }
    ]
  }),

  actions: {
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products))
    },

    addProduct(prod) {
      this.products.push({ ...prod, id: Date.now() })
      this.persist()
    },

    updateProduct(id, data) {
      const idx = this.products.findIndex(p => p.id === id)
      if (idx !== -1) {
        this.products[idx] = { id, ...data }
        this.persist()
      }
    },

    deleteProduct(id) {
      this.products = this.products.filter(p => p.id !== id)
      this.persist()
    }
  }
})
