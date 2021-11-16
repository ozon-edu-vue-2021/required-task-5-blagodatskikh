<template>
  <div class="products-view">
    <div class="products-list">
      <product
        v-for="product in products"
        :key="product.id"
        :product="product"
        :is-favorite="product.id in favorites"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Product from '@/components/Product.vue';

export default {
  name: 'ProductsView',

  components: { Product },

  computed: {
    ...mapGetters({
      products: 'products',
      favorites: 'favorites',
    }),
  },
};
</script>

<style>
.products-view {
  display: flex;
  padding: 30px 80px 20px 80px;
}
.products-list {
  align-items: center;
  display: grid;
  column-gap: 20px;
  row-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  width: 100%;
}
.product {
  justify-self: center;
}
</style>
