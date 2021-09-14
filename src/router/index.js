import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/boards',
    name: 'boards',
    component: () => import('@/views/Boards.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/b/:id',
    name: 'board',
    component: () => import('@/views/Board.vue'),
    async beforeEnter(to, from) {
      await store.dispatch('boardModule/getBoard', to.params.id);
    },
    async beforeUpdate(to, from) {
      await store.dispatch('boardModule/getBoard', to.params.id);
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = await store.dispatch('userModule/getUser');

  if (requiresAuth && !user) {
    next('/');
  } else if (to.name === 'auth' && user) {
    next('/board');
  } else {
    next();
  }
});

export default router;
