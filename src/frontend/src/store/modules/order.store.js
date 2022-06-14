import {
  ADD_PRODUCT_TO_CART,
  CHANGE_PRODUCT_QUANTITY,
  HANDLE_ORDER,
  CHANGE_ADDRESS_INFO,
  SET_DEFAULT_QUANTITY_TO_PRODUCTS,
  REPEAT_ORDER,
  ADD_PHONE,
} from "@/store/mutation-types";

import additionalProducts from "@/static/misc.json";
export default {
  namespaced: true,
  state: {
    phone: "",
    //cart: [...additionalProducts],
    cart: [],
    address: {
      street: "",
      building: "",
      flat: "",
    },
  },
  actions: {
    async handleOrder({ commit, state, rootState }) {
      let order = {};
      order.phone = state.phone;
      order.address = state.address;
      order.userId = rootState.Auth.user ? rootState.Auth.user.id : null;

      let pizzas = state.cart.filter(
        (product) => product.productType == "pizza" && product.quantity > 0
      );
      let misc = state.cart.filter(
        (product) => product.productType != "pizza" && product.quantity > 0
      );

      order.pizzas = pizzas.map((pizza) => {
        pizza.ingredients = pizza.ingredients.map((ingredient) => ({
          ingredientId: ingredient.ingredientId,
          quantity: ingredient.quantity,
        }));
        return {
          name: pizza.name,
          sauceId: pizza.sauceId,
          doughId: pizza.doughId,
          sizeId: pizza.sizeId,
          quantity: pizza.quantity,
          ingredients: pizza.ingredients,
        };
      });
      order.misc = misc.map((product) => ({
        miscId: product.id,
        quantity: product.quantity,
      }));

      await this.$api.orders.createOrder(order);
      commit(HANDLE_ORDER);
    },
    changeProductQuantity({ commit }, data) {
      commit(CHANGE_PRODUCT_QUANTITY, data);
    },
    setAddressValue({ commit }, data) {
      commit(CHANGE_ADDRESS_INFO, data);
    },
    setExistedAddress({ commit, rootState }, addressId) {
      let address = rootState.Profile.addresses.find(
        (address) => address.id == addressId
      );
      for (let key in address) {
        commit(CHANGE_ADDRESS_INFO, { value: address[key], name: key });
      }
    },
    addCountToProductsInCart({ commit }) {
      commit(SET_DEFAULT_QUANTITY_TO_PRODUCTS);
    },
    repeatOrder({ commit }, order) {
      commit(REPEAT_ORDER, order);
    },
    addPhone({ commit }, value) {
      commit(ADD_PHONE, value);
    },
  },
  mutations: {
    [HANDLE_ORDER](state) {
      state.cart = [...additionalProducts];
    },
    [CHANGE_PRODUCT_QUANTITY](state, { quantity, id }) {
      state.cart.find((elem) => elem.id === id).quantity = quantity;
    },
    [ADD_PRODUCT_TO_CART](state, product) {
      product = {
        ...product,
        quantity: product.quantity ? product.quantity : 1,
      };
      let index = state.cart.findIndex((elem) => elem.id === product.id);
      if (index == -1) {
        state.cart.push(product);
      } else {
        state.cart.splice(index, 1, product);
      }
    },
    [CHANGE_ADDRESS_INFO](state, data) {
      if (data === null) {
        state.address = null;
        return;
      }
      let { value, name } = data;
      if (!state.address) {
        state.address = {};
      }
      state.address = { ...state.address, [name]: value };
    },
    [SET_DEFAULT_QUANTITY_TO_PRODUCTS](state) {
      state.cart = state.cart.map((product) => ({
        ...product,
        quantity: product.quantity ? product.quantity : 0,
      }));
    },
    [REPEAT_ORDER](state, order) {
      state.cart = [...order.orderPizzas, ...order.orderMisc];
      state.address = { ...order.orderAddress };
      state.phone = order.phone;
    },
    [ADD_PHONE](state, value) {
      state.phone = value;
    },
  },
  getters: {
    pizzaProducts(state) {
      return state.cart.filter((elem) => elem.productType === "pizza");
    },
    additionalProducts(state) {
      return state.cart.filter((elem) => elem.productType !== "pizza");
    },
    totalPrice(state) {
      return state.cart.reduce(
        (current, product) =>
          current + product.price * (product.quantity ? product.quantity : 0),
        0
      );
    },
  },
};
