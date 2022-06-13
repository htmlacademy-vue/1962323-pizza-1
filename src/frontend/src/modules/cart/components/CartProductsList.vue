<template>
  <div>
    <ul class="cart-list sheet">
      <li
        class="cart-list__item"
        v-for="product of pizzaProducts"
        :key="product.id"
      >
        <div class="product cart-list__product">
          <img
            src="img/product.svg"
            class="product__img"
            width="56"
            height="56"
            alt="Капричоза"
          />
          <div class="product__text">
            <h2>{{ product.name }}</h2>
            <ul>
              <li>{{ getInfo(product) }}</li>
              <li>Соус: {{ getSauce(product) }}</li>
              <li>Начинка: {{ getIngredients(product) }}</li>
            </ul>
          </div>
        </div>
        <ItemCounter
          :product="product"
          counterClass="cart-list__counter"
          plusClass="counter__button--orange"
          @counterHandler="changeProductQuantity"
        />
        <div class="cart-list__price">
          <b>{{ product.price }} ₽</b>
        </div>

        <div class="cart-list__button">
          <button
            type="button"
            class="cart-list__edit"
            @click="changePizza(product)"
          >
            Изменить
          </button>
        </div>
      </li>
    </ul>

    <div class="cart__additional">
      <ul class="additional-list">
        <li
          class="additional-list__item sheet"
          v-for="product of additionalProducts"
          :key="product.id"
        >
          <p class="additional-list__description">
            <img
              :src="product.image"
              width="39"
              height="60"
              alt="Coca-Cola 0,5 литра"
            />
            <span>{{ product.name }}</span>
          </p>
          <div class="additional-list__wrapper">
            <ItemCounter
              :product="product"
              counterClass="additional-list__counter"
              plusClass="counter__button--orange"
              @counterHandler="changeProductQuantity"
            />
            <div class="additional-list__price">
              <b>× {{ product.price }} ₽</b>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ItemCounter from "@/common/components/ItemCounter";
import { ingredientsCounter } from "@/static/consts.json";
import router from "@/router";
import {
  getPizzaInfo,
  getPizzaSauce,
  getPizzaIngredients,
} from "@/common/helpers";
export default {
  components: {
    ItemCounter,
  },

  computed: {
    ingredientsCounter() {
      return ingredientsCounter;
    },

    store() {
      return this.$store.state.PizzaConstructor;
    },

    ...mapGetters("Order", ["pizzaProducts", "additionalProducts"]),
  },

  methods: {
    getInfo(product) {
      return getPizzaInfo(product, this.store);
    },

    getSauce(product) {
      return getPizzaSauce(product, this.store);
    },

    getIngredients(product) {
      return getPizzaIngredients(product, this.store);
    },

    changePizza(product) {
      this.changePizzaConfiguration(product);
      router.push("/");
    },

    ...mapActions("PizzaConstructor", ["changePizzaConfiguration"]),
    ...mapActions("Order", ["changeProductQuantity"]),
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/additional-list.scss";
@import "~@/assets/scss/blocks/product.scss";
@import "~@/assets/scss/blocks/cart-list.scss";
@import "~@/assets/scss/blocks/cart.scss";
</style>
