<template>
  <div class="product-card">
    <img :src="product.image" alt="product image" />
    <h4>{{ product.name }}</h4>
    <p>{{ product.price }}$</p>
    <button class="add-to-cart-btn" @click="$emit('add-to-cart', product)">Add to Cart</button>
  </div>
</template>

<script setup>
defineProps({ product: Object });
defineEmits(['add-to-cart']);
</script>

<style>
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: auto;
  background: #e9ecef;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  max-width: 20rem;
  gap: 0.5rem;
}

.product-card img {
  width: 100%;
  max-width: 20rem;
  height: auto;
  /* max-height: 60%; */
  object-fit: cover;
  border-radius: 6px;
  margin: 0 auto;
}

.product-card h4,
.product-card p {
  text-align: left;
  color: #212529;
}
</style>
