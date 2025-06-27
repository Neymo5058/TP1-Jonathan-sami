<template>
  <header class="header">
    <div class="logo">
      <img :src="logoUrl" alt="Fitwear Logo" class="header__logo" />
      <span class="header__title">Fitwear</span>
    </div>
    <nav class="header__nav">
      <router-link to="/client" class="header__link" exact>Client</router-link>
      <span class="header__sep">›</span>
      <router-link to="/admin" class="header__link">Admin</router-link>
    </nav>
  </header>
</template>

<script setup>
// import statique du logo
import logoUrl from '../assets/images/Fitwear-Logo3.png'
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e9efff;
  padding: 12px 24px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
.header__logo { height: 32px; }
.header__title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2a4aeb;
}
.header__nav { font-weight: bold; }
.header__link {
  text-decoration: none;
  color: #444;
  margin: 0 8px;
}
.header__link.router-link-exact-active {
  color: #2a4aeb;
}
.header__sep { color: #888; }
</style>
