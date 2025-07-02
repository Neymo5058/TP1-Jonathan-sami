<template>
  <div class="card-admin">
    <!-- Product image -->
    <img :src="imageUrl" :alt="product.name" class="card-admin__img" />

    <!-- Info -->
    <div class="card-admin__info">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price.toFixed(2) }}$</p>
      <p>{{ product.quantity }} Qty</p>
    </div>

    <!-- Actions -->
    <div class="card-admin__actions">
      <!-- Edit -->
      <button @click="$emit('edit', product)" class="icon-btn">
        <ion-icon name="create-outline" class="icon icon--edit"></ion-icon>
      </button>
      <!-- Delete -->
      <button @click="$emit('remove', product.id)" class="icon-btn">
        <ion-icon name="trash-outline" class="icon icon--trash"></ion-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ product: Object })
defineEmits(['edit','remove'])

// Glob-import product images as URLs
const images = import.meta.glob(
  '../assets/images/*.{jpg,jpeg,png,svg}',
  { eager: true, query: '?url', import: 'default' }
)
const imageUrl = computed(() =>
  images[`../assets/images/${props.product.image}`] || ''
)
</script>

<style scoped>
.card-admin {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* make sure your images fill the top area */
.card-admin__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.card-admin__info {
  padding: 12px;
  text-align: left;
}

.card-admin__actions {
  display: flex;
  justify-content: right;
  gap: 12px;
  padding: 8px;
  background: #fafafa;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

/* Base size for ion-icon */
.icon {
  font-size: 20px;
  vertical-align: middle;
}

/* Edit icon in default blue */
.icon--edit {
  color: #2A4AEB;
}

/* Trash icon in exact red */
.icon--trash {
  color: #F03E3E;
}
</style>
