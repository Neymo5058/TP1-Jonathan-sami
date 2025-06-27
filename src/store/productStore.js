// src/store/productStore.js
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'ProFit Bottle',
        price: 30,
        quantity: 50,
        image: 'bottle.jpg'
      },
      {
        id: 2,
        name: 'Urban Cap 1',
        price: 40,
        quantity: 20,
        image: 'cap1.jpg'
      },
      {
        id: 3,
        name: 'Urban Cap 2',
        price: 45,
        quantity: 30,
        image: 'cap2.jpg'
      },
      // Nouvelle entrée 1 : le short de plage
      {
        id: 4,
        name: 'Beach Volleyball Shorts',
        price: 25,
        quantity: 15,
        image: 'tamara-bellis-BGmVdP6thkU-unsplash.jpg'
      },
      // Nouvelle entrée 2 : la chaussure de running
      {
        id: 5,
        name: 'Running Shoe',
        price: 120,
        quantity: 10,
        image: 'vlad-ciutacu-tR2ZoPR4OPc-unsplash.jpg'
      },
      // Nouvelle entrée 3 : le maillot Argentina
      {
        id: 6,
        name: 'Argentina Jersey',
        price: 45,
        quantity: 5,
        image: 'diego-castaneda-Mq532Dm-cbU-unsplash.jpg'
      }
    ],
    cart: []
  }),

  getters: {
    total(state) {
      return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    },
    taxes(state) {
      return (this.total * 0.15).toFixed(2)
    },
    subtotal(state) {
      return (this.total + parseFloat(this.taxes)).toFixed(2)
    }
  },

  actions: {
    addToCart(product) {
      const found = this.cart.find(i => i.id === product.id)
      if (found) found.qty++
      else this.cart.push({ ...product, qty: 1 })
    },
    removeFromCart(id) {
      this.cart = this.cart.filter(i => i.id !== id)
    },
    clearCart() {
      this.cart = []
    },
    addProduct(prod) {
      this.products.push({ ...prod, id: Date.now() })
    },
    updateProduct(id, data) {
      const idx = this.products.findIndex(p => p.id === id)
      if (idx > -1) this.products[idx] = { id, ...data }
    },
    deleteProduct(id) {
      this.products = this.products.filter(p => p.id !== id)
    }
  }
})
