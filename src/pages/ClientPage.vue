<script setup>
// Importing the picture
import ArgentinaJersey from '@/assets/images/argentina-jersey.jpg';
import RunningShorts from '@/assets/images/running-shorts.png';
import RunningShoes from '@/assets/images/running-shoes.png';
import Cap1 from '@/assets/images/cap1.jpg';
import Bottle from '@/assets/images/argentina-jersey.jpg';
import Cap2 from '@/assets/images/cap2.jpg';
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

function addToCart(product) {
  cart.value.push(product);
}
</script>

<template>
  <div>
    <Header />
    <HeroSection />
    <section class="main-container">
      <div class="left-panel">
        <Cart :cart="cart" />
      </div>

      <div class="right-panel">
        <ProductGrid :products="products" @add-to-cart="addToCart" />
      </div>
    </section>
    <Footer />
  </div>
</template>

<style scoped>
.main-container {
  display: grid;
  grid-template-columns: 15rem 1fr;
  gap: 1rem;
  padding: 2rem;
  margin: 0 auto;
  align-items: start;
  background-color: #f9fafb;
}

.left-panel {
  width: 100%;
  max-width: 15rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  display: grid;
  gap: 0.5rem;
  background-color: green;
  font-family: 'Poppins', sans-serif;
}
.right-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 2rem;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .main-container {
    grid-template-columns: 1fr;
  }

  .right-panel {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .right-panel {
    grid-template-columns: 1fr;
  }
}
</style>
