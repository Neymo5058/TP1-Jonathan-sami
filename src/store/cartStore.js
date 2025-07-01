// src/store/cartStore.js
import { defineStore } from 'pinia'

const CART_KEY = 'fitwear_cart'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(localStorage.getItem(CART_KEY) || 'null') || []
  }),

  getters: {
    total(state) {
      return state.cart.reduce((sum, i) => sum + i.price * i.qty, 0)
    }
  },

  actions: {
    persist() {
      localStorage.setItem(CART_KEY, JSON.stringify(this.cart))
    },

    addToCart(product) {
      const found = this.cart.find(i => i.id === product.id)
      if (found) found.qty++
      else this.cart.push({ id: product.id, price: product.price, qty: 1 })
      this.persist()
    },

    removeFromCart(id) {
      this.cart = this.cart.filter(i => i.id !== id)
      this.persist()
    },

    clearCart() {
      this.cart = []
      this.persist()
    }
  }
})
