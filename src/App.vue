<template>
  <!-- Header commun à toutes les pages -->
  <Header />

  <!-- C’est ici que Vue-Router injecte ClientPage ou AdminPage -->
  <router-view />

  <!-- Footer commun -->
  <Footer />
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>
