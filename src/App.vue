<template>
  <div id="app">
    <ul class="header">
      <div class="left">
        <router-link class="products" to="/" title="Каталог">
          <list-icon w="1.5rem" h="1.5rem" />
          <span>Каталог</span>
        </router-link>
      </div>
      <div class="center">
        <h1>МАГОЗОН</h1>
      </div>
      <div class="right">
        <router-link to="favorites" title="Избранное"><heart-icon w="1.5rem" h="1.5rem" /></router-link>
        <router-link to="cart" title="Корзина"><basket-icon w="1.5rem" h="1.5rem" /></router-link>
      </div>
    </ul>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import BasketIcon from 'vue-ionicons/dist/md-basket.vue';
import HeartIcon from 'vue-ionicons/dist/md-heart.vue';
import ListIcon from 'vue-ionicons/dist/md-list.vue';

export default {
  name: 'App',

  components: {
    BasketIcon,
    HeartIcon,
    ListIcon,
  },

  mounted() {
    this.$store.dispatch('fetchProducts');
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  box-sizing: border-box;
}

html,
body,
#app {
  max-height: 100%;
  min-height: 100%;
}
html {
  overflow-x: hidden;
  margin-right: calc(-1 * (100vw - 100%));
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.header {
  align-items: center;
  background-color: white;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 10px 40px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
}
.header > .left {
}
.header > .right {
  display: flex;
  gap: 10px;
}
.content {
  justify-content: center;
}
.header > .left > .products {
  align-items: center;
  display: flex;
}
</style>
