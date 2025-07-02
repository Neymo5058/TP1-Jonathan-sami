import { createRouter, createWebHistory } from 'vue-router';
import ClientPage from '../pages/ClientPage.vue';
import AdminPage from '../pages/Admin.vue';

const routes = [
  { path: '/', redirect: '/client' },
  { path: '/client', component: ClientPage },
  { path: '/admin', component: AdminPage },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
