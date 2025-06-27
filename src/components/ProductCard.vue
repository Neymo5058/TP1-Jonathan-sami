<template>
  <div class="product-card">
    <img :src="require(`../assets/${product.image}`)" :alt="product.name" />
    <div class="info">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price.toFixed(2) }}$</p>
    </div>
    <button @click="$emit('add', product)">Add to Cart</button>
  </div>
</template>

<script setup>
defineProps({ product: Object })
defineEmits(['add'])
</script>
