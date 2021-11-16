<template>
  <div class="favorites-view">
    <transition-group class="products-list" name="products-list">
      <product
        v-for="product in favoriteProducts"
        :key="product.id"
        :product="product"
        :is-favorite="product.id in favorites"
      />
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Product from '@/components/Product.vue';

export default {
  name: 'FavoritesView',

  components: { Product },

  computed: {
    ...mapGetters({
      favorites: 'favorites',
      favoriteProducts: 'favoriteProducts',
    }),
  },
};
</script>

<style scoped>
.favorites-view {
  display: flex;
  padding: 30px 80px 20px 80px;
}
.product-list {
  align-items: center;
  display: grid;
  column-gap: 20px;
  row-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  width: 100%;
}
.products-list-leave {
  transition: all 1s;
}
.product-leave {
  transition: all 1s;
}
</style>
