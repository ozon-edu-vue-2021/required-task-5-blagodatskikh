<template>
  <div class="cart-view">
    <div class="cart-list">
      <div class="product" v-for="product in productsInCart" :key="product.id">
        <input type="checkbox" v-model="selected" :value="product.id" />
        <img :src="product.image" width="100" />
        <div class="title">{{ product.dish }}</div>
        <div class="price">{{ product.price * product.amount }}&nbsp;Р</div>
        <button @click="minus(product)">-</button>
        <div class="amount">{{ product.amount }}</div>
        <button @click="plus(product)">+</button>
        <span v-if="product.amount > 1">({{ product.price }}&nbsp;за&nbsp;шт.)</span>
      </div>
    </div>
    <div class="order">
      <button @click="checkout" :disabled="totalPrice === 0">Оформить</button>
      <div class="total-price">Общая стоимость: {{ totalPrice }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartView',

  data: () => ({
    selected: [],
  }),

  computed: {
    ...mapGetters({
      productsInCart: 'productsInCart',
    }),

    selectedProducts() {
      return Object.values(this.productsInCart).filter((p) => this.selected.includes(p.id));
    },

    totalPrice() {
      return this.selectedProducts.reduce((p, c) => p + c.price * c.amount, 0);
    },
  },

  methods: {
    minus(product) {
      if (product.amount === 1) return;

      this.$store.dispatch('setAmountInCart', { product, amount: product.amount - 1 });
    },
    plus(product) {
      this.$store.dispatch('setAmountInCart', { product, amount: product.amount + 1 });
    },

    checkout() {
      const formatted = this.selectedProducts.map((p) => `${p.id} ${p.dish} ${p.amount} шт.`);
      alert(formatted.join('\n'));
    },
  },
};
</script>

<style scoped>
.cart-view {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 30px 80px 20px 80px;
}
.cart-list {
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
}
.product {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
}
.total-price {
  font-weight: 600;
  padding-top: 20px;
}
</style>
