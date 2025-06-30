<template>
  <aside class="cart-container">
    <h3>Cart Items</h3>
    <div v-for="item in cart" :key="item.id">
      <p>{{ item.name + ' ' + item.price + '$' }}</p>
    </div>
  </aside>
</template>

<script setup>
defineProps({ cart: Array });
</script>
