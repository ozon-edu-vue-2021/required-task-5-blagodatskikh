import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

const path = require.context('./assets/images', false, /\.webp$/);
const images = path.keys().map(path);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    favorites: {},
    cart: {},
  },

  getters: {
    products: (state) => state.products,
    favorites: (state) => state.favorites,
    cart: (state) => state.cart,

    favoriteProducts: (state) => state.products.filter((product) => product.id in state.favorites),
    productsInCart: (state) =>
      Object.fromEntries(
        state.products
          .filter((product) => product.id in state.cart)
          .map((product) => [product.id, { ...product, amount: state.cart[product.id] }])
      ),
  },

  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addToFavorites(state, product) {
      Vue.set(state.favorites, product.id, true);
    },
    removeFromFavorites(state, product) {
      Vue.delete(state.favorites, product.id);
    },
    addToCart(state, product) {
      const current = state.cart[product.id] ?? 0;
      Vue.set(state.cart, product.id, current + 1);
    },
    setAmountInCart(state, { product, amount }) {
      Vue.set(state.cart, product.id, amount);
    },
    removeFromCart(state, product) {
      Vue.delete(state.cart, product.id);
    },
  },

  actions: {
    async fetchProducts({ commit }) {
      const response = await axios.get('https://random-data-api.com/api/food/random_food?size=30');

      const products = response?.data.map((item) => ({
        ...item,
        price: Math.round(Math.random() * 500 + 50),
        image: images[Math.floor(Math.random() * images.length)],
      }));

      commit('setProducts', products);
    },

    async toggleFavorite({ commit, state }, product) {
      if (product.id in state.favorites) {
        commit('removeFromFavorites', product);
      } else {
        commit('addToFavorites', product);
      }
    },

    async addToCart({ commit }, product) {
      commit('addToCart', product);
    },
    async setAmountInCart({ commit }, { product, amount }) {
      commit('setAmountInCart', { product, amount });
    },
    async removeFromCart({ commit }, product) {
      commit('removeFromCart', product);
    },
  },
});
