<script setup>
import heroImage from '../assets/images/Hero.jpg';
</script>

<template>
  <section class="hero-section" :style="{ backgroundImage: `url(${heroImage})` }">
    <div class="hero-content">
      <h1>Everything You Need to Perform in Style.</h1>
      <h3>New Collections Every Season to Keep You at the Top.</h3>
      <p class="shipping">Free Shipping <ion-icon name="gift-outline"></ion-icon></p>
    </div>
  </section>
</template>

<style>
.hero-section {
  position: relative;
  height: 85vh;
  width: 100vw;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

.hero-content {
  position: absolute;
  top: 10%;
  left: 60%;
  transform: translateX(-50%);
  text-align: left;
  color: #212529;
  z-index: 1;
  max-width: 700px;
  width: 100%;
  font-family: 'poppins', sans-serifs;
}

.hero-content h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.hero-content h3,
.hero-content p {
  font-size: 1.8rem;
}
</style>
