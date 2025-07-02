<template>
  <teleport to="body">
    <div v-if="visible" class="modal-overlay">
      <div class="modal-window">
        <h3 class="modal-title">{{ product ? 'Edit Product' : 'Add Product' }}</h3>
        <form @submit.prevent="onSubmit" class="modal-form">
          <label>
            Name
            <input v-model="form.name" type="text" required />
          </label>
          <label>
            Price
            <input v-model.number="form.price" type="number" min="0" step="0.01" required />
          </label>
          <label>
            Quantity
            <input v-model.number="form.quantity" type="number" min="0" required />
          </label>
          <label>
            Image filename
            <input v-model="form.image" type="text" placeholder="e.g. cap1.jpg" required />
          </label>
          <div class="modal-actions" style="margin-top:12px;">
            <button class="btn btn--primary" type="submit">
              {{ product ? 'Save' : 'Add' }}
            </button>
            <button class="btn btn--default" type="button" @click="$emit('cancel')">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { reactive, toRefs, watch } from 'vue'

const props = defineProps({
  visible: { type: Boolean, required: true },
  product: { type: Object, default: null }
})

const emit = defineEmits(['submit','cancel'])

// reactive form state
const form = reactive({
  id:       null,
  name:     '',
  price:    0,
  quantity: 0,
  image:    ''
})

// whenever props.product changes, reset the form
watch(() => props.product, p => {
  if (p) {
    form.id       = p.id
    form.name     = p.name
    form.price    = p.price
    form.quantity = p.quantity
    form.image    = p.image
  } else {
    form.id       = null
    form.name     = ''
    form.price    = 0
    form.quantity = 0
    form.image    = ''
  }
}, { immediate: true })

function onSubmit() {
  // emit a plain object copy
  emit('submit', { id: form.id, name: form.name, price: form.price, quantity: form.quantity, image: form.image })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top:0; left:0; width:100vw; height:100vh;
  background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal-window {
  background: #E9ECEF;
  border-radius: 6px;
  padding: 24px;
  width: 320px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.modal-title {
  margin: 0 0 12px;
  font-size: 1.2rem;
  text-align: center;
}
.modal-form label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
}
.modal-form input {
  width: 100%;
  padding: 6px 8px;
  margin-top: 4px;
  box-sizing: border-box;
  
}
.modal-actions {
  display: flex;
  justify-content: space-between;
}
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn--primary { background: green; color: white; }
.btn--default { background: rgb(235, 49, 3); color: white; }
</style>
