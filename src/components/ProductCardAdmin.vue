<template>
  <div class="card-admin">
    <img :src="imageUrl" :alt="product.name" class="card-admin__img" />

    <div class="card-admin__info">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price.toFixed(2) }}$</p>
      <p>{{ product.quantity }} Qty</p>
    </div>

    <div class="card-admin__actions">
      <button @click="$emit('edit', product)">
        <img :src="editIcon"  alt="Modifier"  class="card-admin__icon" />
      </button>
      <button @click="$emit('remove', product.id)">
        <img :src="trashIcon" alt="Supprimer" class="card-admin__icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// props & emits
const props = defineProps({ product: Object })
defineEmits(['edit','remove'])

// import des icônes
import editIcon  from '../assets/images/card-outline.svg'
import trashIcon from '../assets/images/trash-outline.svg'

// dynamique : URL de l’image produit
const imageUrl = computed(() =>
  new URL(`../assets/images/${props.product.image}`, import.meta.url).href
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
}
.card-admin__img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
.card-admin__info {
  padding: 12px;
  text-align: center;
}
.card-admin__actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 8px;
  background: #fafafa;
}
.card-admin__icon {
  width: 20px;
  height: 20px;
}
</style>
