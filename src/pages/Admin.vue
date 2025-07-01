<template>
  <div class="admin-page">
    <main class="admin__main">
      <div class="container">
        <!-- Controls -->
        <div class="admin__controls">
          <!-- Search Bar -->
          <div class="search-bar">
            <div class="search-bar__icon">
              <ion-icon name="search-outline"></ion-icon>
            </div>
            <input
              v-model="search"
              type="text"
              placeholder="Search..."
              class="search-bar__input"
            />
          </div>

          <button class="btn btn--primary" @click="openAdd">Add Product</button>

          <div class="sort-dropdown">
            <label for="sort-select" class="sort-label">Sort by:</label>
            <select id="sort-select" v-model="sortOption" class="sort-select">
              <option value="qtyAsc">Stock: Low → High</option>
              <option value="qtyDesc">Stock: High → Low</option>
            </select>
          </div>
        </div>

        <!-- Title -->
        <h2 class="admin__title">Product List</h2>

        <!-- Responsive Grid -->
        <div class="admin__grid">
          <ProductCardAdmin
            v-for="p in filtered"
            :key="p.id"
            :product="p"
            @edit="openEdit"
            @remove="openDelete"
          />
        </div>
      </div>
    </main>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :visible="showDelete"
      title="Delete Product"
      message="Are you sure you want to delete this product?"
      @confirm="confirmDelete"
      @cancel="showDelete = false"
    />

    <!-- Add/Edit Product Modal -->
    <ProductFormModal
      :visible="showForm"
      :product="editingProduct"
      @submit="submitForm"
      @cancel="showForm = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCardAdmin from '../components/ProductCardAdmin.vue'
import ConfirmModal      from '../components/ConfirmModal.vue'
import ProductFormModal  from '../components/ProductFormModal.vue'
import { useProductStore } from '../store/productStore.js'

const store = useProductStore()
const search = ref('')
const sortOption = ref('qtyAsc')

const showDelete = ref(false)
const showForm = ref(false)
const deletingId = ref(null)
const editingProduct = ref(null)

const filtered = computed(() => {
  const list = store.products.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
  return sortOption.value === 'qtyAsc'
    ? list.sort((a, b) => a.quantity - b.quantity)
    : list.sort((a, b) => b.quantity - a.quantity)
})

function openDelete(id) {
  deletingId.value = id
  showDelete.value = true
}
function openAdd() {
  editingProduct.value = null
  showForm.value = true
}
function openEdit(p) {
  editingProduct.value = { ...p }
  showForm.value = true
}

function confirmDelete() {
  store.deleteProduct(deletingId.value)
  showDelete.value = false
}
function submitForm(prod) {
  if (prod.id) {
    store.updateProduct(prod.id, {
      name:     prod.name,
      price:    prod.price,
      quantity: prod.quantity,
      image:    prod.image
    })
  } else {
    store.addProduct(prod)
  }
  showForm.value = false
}
</script>

<style scoped>
/* Base Layout */
.admin-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.admin__main {
  flex: 1;
  background: #f7f8fa;
  padding: 24px 0;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

/* Pill-shaped Search Bar */
.search-bar {
  display: flex;
  align-items: center;
  height: 40px;
  max-width: 300px;
}
.search-bar__icon {
  background: #2a4aeb;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  height: 33px;
}
.search-bar__icon ion-icon {
  font-size: 16px;
  color: white;
}
.search-bar__input {
  flex: 1;
  border: 1px solid #ccc;
  border-left: none;
  padding: 8px 12px;
  font-size: 0.9rem;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  outline: none;
}

/* Controls */
.admin__controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn--primary {
  background: #2a4aeb;
  color: white;
}
.sort-dropdown {
  display: flex;
  align-items: center;
  gap: 6px;
}
.sort-label {
  font-weight: bold;
}
.sort-select {
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Title */
.admin__title {
  margin: 0 0 16px;
  font-size: 1.25rem;
  color: #333;
}

/* Responsive Grid */
.admin__grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 900px) {
  .admin__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .admin__grid {
    grid-template-columns: 1fr;
  }
  .admin__controls {
    flex-direction: column;
    align-items: stretch;
  }
  .btn, .sort-dropdown {
    width: 100%;
  }
}
</style>
