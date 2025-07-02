<script setup>
import logo from '../assets/images/Fitwear-Logo3.png';
</script>

<template>
  <header class="header-bar">
    <div class="logo-container">
      <img :src="logo" alt="Fitwear Logo" class="logo-img" />
    </div>
    <nav class="navbar">
      <a href="#" class="nav-link">Client</a>
      <a href="#" class="nav-link">Admin</a>
    </nav>
  </header>
</template>

<style>
/* HEADER */
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 2rem 0.5rem;
  width: 100vw;
  height: 2rem;
  background: linear-gradient(to top, #f8f9fa, #dbe4ff);
}
.navbar {
  display: flex;
  gap: 20px;
}
.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
.logo-img {
  height: 10rem;
  width: 10rem;
}
</style>
