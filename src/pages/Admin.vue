<template>
  <div class="admin-page">
  

    <section class="admin-controls">
      <div class="search">
        <img :src="searchIcon" alt="Search" class="search__icon" />
        <input v-model="search" placeholder="Search..." class="search__input" />
      </div>
      <button class="btn btn--primary" @click="openForm">Add Product</button>
      <button class="btn btn--default" @click="toggleSort">
        Sort By {{ sortAsc ? '▲' : '▼' }}
      </button>
    </section>

    <h2 class="admin-title">Product List</h2>

    <div class="admin-grid">
      <ProductCardAdmin
        v-for="p in filtered"
        :key="p.id"
        :product="p"
        @edit="onEdit"
        @remove="onRemove"
      />
    </div>

    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCardAdmin from '../components/ProductCardAdmin.vue'
import { useProductStore } from '../store/productStore.js'

// import statique de l’icône de recherche
import searchIcon from '../assets/images/card-outline.svg'

const store   = useProductStore()
const search  = ref('')
const sortAsc = ref(true)

const filtered = computed(() => {
  const list = store.products.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
  return sortAsc.value
    ? list.sort((a, b) => a.quantity - b.quantity)
    : list.sort((a, b) => b.quantity - a.quantity)
})

function toggleSort() { sortAsc.value = !sortAsc.value }
function openForm()  { /* ouvrir ton modal add/edit */ }
function onEdit(p)   { /* remplir et ouvrir modal édition */ }
function onRemove(id){
  if (confirm('Delete?')) store.deleteProduct(id)
}
</script>

<style scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.admin-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: #f7f8fa;
}
.search {
  position: relative;
  flex: 1;
  max-width: 300px;
}
.search__icon {
  position: absolute;
  top: 50%;
  left: 8px;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  opacity: 0.6;
}
.search__input {
  width: 100%;
  padding: 8px 8px 8px 32px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn--primary { background: #2a4aeb; color: white; }
.btn--default { background: #e0e0e0; }
.admin-title {
  margin: 0 24px;
  font-size: 1.25rem;
}
.admin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px,1fr));
  gap: 16px;
  padding: 16px 24px;
  flex: 1;
}
</style>
