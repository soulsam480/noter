import store from '@/store';
import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route } from 'vue-router';
import Home from '../views/Home.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
    beforeEnter: async (to: Route, from: Route, next: NavigationGuardNext) => {
      try {
        const user: boolean = await store.dispatch('checkAuth');
        if (user) {
          next();
        } else next({ path: '/' });
      } catch (error) {
        next({ path: '/', query: { redirectTo: to.path } });
      }
    },
  },
  {
    path: '/boards',
    name: 'Boards',
    component: () => import('../views/Boards.vue'),
    beforeEnter: async (to: Route, from: Route, next: NavigationGuardNext) => {
      try {
        const user: boolean = await store.dispatch('checkAuth');
        if (user) {
          next();
        } else next({ path: '/' });
      } catch (error) {
        next({ path: '/', query: { redirectTo: to.path } });
      }
    },
    children: [
      {
        path: ':_slug',
        name: 'Board',
        component: () => import('../views/Board.vue'),
        params: true,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
