<template>
  <div class="cart">
    <h2>Cart Items 🛒</h2>
    <ul>
      <li v-for="item in cart" :key="item.id">
        {{ item.name }} <span>{{ item.qty }} × {{ item.price }}$</span>
        <button @click="remove(item.id)">×</button>
      </li>
    </ul>
    <div class="totals">
      <p>Total: {{ total }}$</p>
      <p>Taxes: {{ taxes }}$</p>
      <p>Subtotal: {{ subtotal }}$</p>
    </div>
    <button class="btn-process" @click="clear">Process</button>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '../store/productStore.js'

const store = useProductStore()
const { cart } = storeToRefs(store)
const { total, taxes, subtotal } = storeToRefs(store)

function remove(id) { store.removeFromCart(id) }
function clear()    { store.clearCart() }
</script>
