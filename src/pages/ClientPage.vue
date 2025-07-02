<script setup>
import { ref, computed } from 'vue';
import { useProductStore } from '../store/productStore.js';
import { useCartStore } from '../store/cartStore.js';
import HeroSection from '@/components/HeroSection.vue';
import Cart from '@/components/Cart.vue';
import ProductGrid from '@/components/ProductGrid.vue';

// 1) Pinia stores
const productStore = useProductStore();
const cartStore = useCartStore();

// 2) Glob import your images as URLs
const images = import.meta.glob('../assets/images/*.{jpg,jpeg,png,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

// 3) Products computed just like Admin
const products = computed(() =>
  productStore.products.map((p) => ({
    ...p,
    image: images[`../assets/images/${p.image}`] || '',
  }))
);

// 4) Cart computed: map `qty`→`quantity`
const cart = computed(() =>
  cartStore.cart.map((item) => {
    const prod = productStore.products.find((p) => p.id === item.id) || {};
    return {
      id: item.id,
      name: prod.name,
      price: prod.price,
      image: images[`../assets/images/${prod.image}`] || '',
      quantity: item.qty, // ← this fixes the NaN
    };
  })
);

// 5) Cart actions
function addToCart(product) {
  cartStore.addToCart(product);
}
function removeFromCart(id) {
  cartStore.removeFromCart(id);
}

// 6) Order modal
const showModal = ref(false);
function confirmOrder() {
  if (cart.value.length) cartStore.clearCart();
  showModal.value = false;
}

// 7) Totals
const subtotal = computed(() => cart.value.reduce((sum, i) => sum + i.price * i.quantity, 0));
const taxes = computed(() => +(subtotal.value * 0.14975).toFixed(2));
const total = computed(() => +(subtotal.value + taxes.value).toFixed(2));
</script>

<template>
  <HeroSection />

  <section class="main-container">
    <!-- left panel: cart + process -->
    <aside class="left-panel">
      <Cart :cart="cart" @remove-from-cart="removeFromCart" />

      <div class="cart-summary" v-if="cart.length">
        <p>Sub-total : {{ subtotal.toFixed(2) }}$</p>
        <p>Taxes : {{ taxes }}$</p>
        <p>
          <strong>Total : {{ total }}$</strong>
        </p>
      </div>

      <button class="process-btn" @click="showModal = true" :disabled="!cart.length">
        <ion-icon name="card-outline"></ion-icon>
        Process
      </button>

      <div class="modal-overlay" v-if="showModal">
        <div class="modal">
          <p>Are you sure you want to confirm the order?</p>
          <div class="modal-actions">
            <button class="yes-btn" @click="confirmOrder">Yes</button>
            <button class="no-btn" @click="showModal = false">No</button>
          </div>
        </div>
      </div>
    </aside>

    <!-- right panel: product grid -->
    <div class="right-panel">
      <ProductGrid :products="products" @add-to-cart="addToCart" />
    </div>
  </section>
</template>

<style>
.main-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 3rem;
  padding: 1rem;
  margin: 0 auto;
  align-items: start;
  background-color: #f9fafb;
}

.left-panel {
  background-color: #e9ecef;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  display: grid;
  gap: 0.5rem;
}

.right-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 2rem;
}

.process-btn {
  background-color: #22c55e;
  color: #f8f9fa;
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: fit-content;
  margin-left: auto;
}
.process-btn:hover {
  background-color: #218838;
}
.process-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-to-cart-btn {
  background-color: #22c55e;
  color: #f8f9fa;
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: fit-content;
  margin-left: auto;
}

.add-to-cart-btn:hover {
  background-color: #218838;
}

.yes-btn,
.no-btn {
  background-color: #22c55e;
  color: #f8f9fa;
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: fit-content;
  margin-left: auto;
}

.yes-btn:hover,
.no-btn:hover {
  background-color: #218838;
}
/* minimal modal styling, keep yours as-is */
.modal-overlay {
  background-color: #e9ecef;
}
</style>
