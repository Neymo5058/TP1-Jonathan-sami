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
        // ici, “bottle.jpg” existe bien dans src/assets/images/
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
      // … ajoute les autres produits de la même façon
    ],
    cart: []
  }),
  // getters / actions inchangés…
})
