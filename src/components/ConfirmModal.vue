<template>
  <teleport to="body">
    <div v-if="visible" class="modal-overlay">
      <div class="modal-window">
        <h3 class="modal-title">{{ title }}</h3>
        <p class="modal-message">{{ message }}</p>
        <div class="modal-actions">
          <button class="btn btn--danger" @click="$emit('confirm')">Yes</button>
          <button class="btn btn--default" @click="$emit('cancel')">No</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, required: true },
  title:   { type: String,  default: 'Confirm' },
  message: { type: String,  default: 'Are you sure?' }
})
defineEmits(['confirm','cancel'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-window {
  background: white;
  border-radius: 6px;
  padding: 24px;
  width: 300px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  text-align: center;
}
.modal-title {
  margin: 0 0 12px;
  font-size: 1.2rem;
}
.modal-message {
  margin-bottom: 16px;
}
.modal-actions {
  display: flex;
  justify-content: space-around;
}
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn--danger { background: #F03E3E; color: white; }
.btn--default { background: #e0e0e0; }
</style>
