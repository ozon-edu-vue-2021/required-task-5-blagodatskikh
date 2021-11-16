<template>
  <div class="product">
    <button class="favorite" @click="toggleFavorite(product)">
      <heart-icon :class="{ liked: isFavorite }" h="2rem" w="2rem" />
    </button>
    <img :src="product.image" loading="lazy" decoding="async" width="200" height="200" />
    <div class="price">{{ product.price }}&nbsp;Р</div>
    <div class="title">{{ product.dish }}</div>
    <div class="cart-controls">
      <button v-if="!amount" @click="addToCart(product)">В корзину</button>
      <button v-if="amount" @click="goToCart">В корзине</button>
      <button v-if="amount" @click="minus">-</button>
      <span v-if="amount">{{ amount }}</span>
      <button v-if="amount" @click="plus">+</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeartIcon from 'vue-ionicons/dist/md-heart.vue';

export default {
  name: 'Product',

  components: { HeartIcon },

  props: {
    isFavorite: { type: Boolean, default: false },
    product: { type: Object, default: () => ({}) },
  },

  computed: {
    ...mapGetters({
      productsInCart: 'productsInCart',
    }),
    amount() {
      return this.productsInCart[this.product?.id]?.amount ?? 0;
    },
  },

  methods: {
    toggleFavorite(product) {
      this.$store.dispatch('toggleFavorite', product);
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    goToCart() {
      this.$router.push({ name: 'cart' });
    },
    minus() {
      if (this.amount === 1) this.$store.dispatch('removeFromCart', this.product);
      else this.$store.dispatch('setAmountInCart', { product: this.product, amount: this.amount - 1 });
    },
    plus() {
      this.$store.dispatch('setAmountInCart', { product: this.product, amount: this.amount + 1 });
    },
  },
};
</script>

<style>
.product {
  display: flex;
  gap: 5px;
  flex-flow: column nowrap;
  position: relative;
  width: 200px;
}
.product > .price {
  font-weight: 600;
}
.product > .title {
  font-size: 0.9rem;
}
.favorite {
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  position: absolute;
  top: -0.8rem;
  right: -1rem;
}
.favorite svg {
  fill: white;
  stroke: black;
  stroke-width: 1.5em;
}
.favorite svg:hover {
  stroke: rgb(214, 66, 66);
}
.product img {
  max-width: 100%;
}
.liked svg {
  fill: rgb(214, 66, 66);
  stroke: white;
}
</style>
