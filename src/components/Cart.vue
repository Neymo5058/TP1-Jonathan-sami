<template>
  <aside class="cart-container">
    <h3>Cart Items <ion-icon name="cart-outline"></ion-icon></h3>
    <div v-for="item in cart" :key="item.id" class="cart-item">
      <ion-icon
        name="trash-outline"
        class="trash-icon"
        @click="$emit('remove-from-cart', item.id)"
      />
      <div class="item-info">
        <span class="name">{{ item.name }}</span>
        <span class="details">
          {{ item.price }}$ × {{ item.quantity }} = {{ item.price * item.quantity }}$
        </span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useProductStore } from '../store/productStore.js';
defineProps({ cart: Array });
</script>

<style>
.cart-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0;
}

.trash-icon {
  cursor: pointer;
  font-size: 1.2rem;
  color: #f03e3e;
  transition: transform 0.2s;
}

.trash-icon:hover {
  transform: scale(1.2);
}

.item-text {
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
}
</style>
