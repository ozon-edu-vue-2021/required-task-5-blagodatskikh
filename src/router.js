import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('./views/Products.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/Cart.vue'),
    },
    {
      path: '/favorites',
      component: () => import('./views/Favorites.vue'),
    },
  ],
});
