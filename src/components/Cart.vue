<template>
  <aside class="cart-container">
    <h3>
      Cart Items
      <ion-icon name="cart-outline"></ion-icon>
    </h3>

    <div 
      v-for="item in cart" 
      :key="item.id" 
      class="cart-item"
    >
      <!-- Trash icon to remove one unit / item -->
      <ion-icon
        name="trash-outline"
        class="trash-icon"
        @click="$emit('remove-from-cart', item.id)"
      />

      <div class="item-info">
        <span class="name">{{ item.name }}</span>
        <span class="details">
          {{ item.price }}$ × {{ item.quantity }} = {{ (item.price * item.quantity).toFixed(2) }}$
        </span>
      </div>
    </div>
  </aside>
</template>

<script setup>
// Receive the cart items and emit remove events
defineProps({
  cart: { type: Array, required: true }
})
defineEmits(['remove-from-cart'])
</script>

<style scoped>
.cart-container {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.cart-container h3 {
  margin: 0 0 12px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
}

.cart-container h3 ion-icon {
  margin-left: 8px;
  font-size: 1.2rem;
  color: #2a4aeb;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 8px 0;
  border-top: 1px solid #eee;
}

.cart-item:first-of-type {
  border-top: none;
}

.trash-icon {
  cursor: pointer;
  font-size: 1.2rem;
  color: #F03E3E;
  transition: transform 0.2s;
}

.trash-icon:hover {
  transform: scale(1.2);
}

.item-info {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
  font-size: 0.95rem;
}

.details {
  font-size: 0.85rem;
  color: #555;
}
</style>
