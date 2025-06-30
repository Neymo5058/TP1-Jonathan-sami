import { createRouter, createWebHistory } from 'vue-router';
import ClientPage from '../pages/ClientPage.vue';

const routes = [{ path: '/', component: ClientPage }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
