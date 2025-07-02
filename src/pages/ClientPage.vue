<script setup>
// Importing the picture
import ArgentinaJersey from '@/assets/images/argentina-jersey.jpg';
import RunningShorts from '@/assets/images/running-shorts.png';
import RunningShoes from '@/assets/images/running-shoes.png';
import Cap1 from '@/assets/images/cap2.jpg';
import Bottle from '@/assets/images/bottle.jpg';
import Cap2 from '@/assets/images/cap1.jpg';
//
import { ref } from 'vue';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import HeroSection from '@/components/HeroSection.vue';
import Cart from '@/components/Cart.vue';
import ProductGrid from '@/components/ProductGrid.vue';

const products = ref([
  { id: 1, name: 'Argentina Jersey', price: 45.0, image: ArgentinaJersey },
  { id: 2, name: 'Running Shorts', price: 25.0, image: RunningShorts },
  { id: 3, name: 'Running Shoes', price: 120.0, image: RunningShoes },
  { id: 4, name: 'Urban Cap', price: 40.0, image: Cap1 },
  { id: 5, name: 'ProFit Bottle', price: 30.0, image: Bottle },
  { id: 6, name: 'MTL Flex Cap', price: 45.0, image: Cap2 },
]);

const cart = ref([]);
const showModal = ref(false);
// Add to cart
function addToCart(product) {
  const existing = cart.value.find((p) => p.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.value.push({ ...product, quantity: 1 });
  }
}
// Remove from cart
function removeFromCart(id) {
  const index = cart.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    if (cart.value[index].quantity > 1) {
      cart.value[index].quantity--;
    } else {
      cart.value.splice(index, 1);
    }
  }
}
// calculate total
function calculateTotal() {
  const subtotal = cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.14975;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  return {
    subtotal: subtotal.toFixed(2),
    taxes: taxes.toFixed(2),
    total: total.toFixed(2),
  };
}

// clean cart
function confirmOrder() {
  if (cart.value.length === 0) {
    showModal.value = false;
    return;
  }

  cart.value = [];
  showModal.value = false;
}
</script>

<template>
  <div>
    <Header />
    <HeroSection />
    <section class="main-container">
      <div class="left-panel">
        <Cart :cart="cart" @remove-from-cart="removeFromCart" />

        <div class="cart-summary" v-if="cart.length > 0">
          <p>Sub-total : {{ calculateTotal().subtotal }}$</p>
          <p>Taxes : {{ calculateTotal().taxes }}$</p>
          <p>
            <strong>Total : {{ calculateTotal().total }}$</strong>
          </p>
        </div>
        <button class="process-btn" @click="showModal = true" :disabled="cart.length === 0">
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
      </div>

      <div class="right-panel">
        <ProductGrid :products="products" @add-to-cart="addToCart" />
      </div>
    </section>
    <Footer />
  </div>
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
  width: 100%;
  max-width: none;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  display: grid;
  gap: 0.5rem;
  background-color: #e9ecef;
  font-family: 'Poppins', sans-serif;
}

.right-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 2rem;
}
.modal-overlay {
  background-color: #e9ecef;
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
  /* text-align: left; */
}

.add-to-cart-btn:hover {
  background-color: #218838;
}
</style>
