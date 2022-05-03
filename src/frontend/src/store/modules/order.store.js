import router from '@/router'
import { 
    ADD_PRODUCT_TO_CART,
    CHANGE_PRODUCT_QUANTITY,
    CHANGE_PIZZA_CONFIGURATION,
    HANDLE_ORDER,
    ADD_ORDER_INFO
} from "@/store/mutation-types";

import additionalProducts from '@/static/misc.json'

export default {
  namespaced: true,
  state: {
    cart: {...additionalProducts},
    orderInfo: {
      delivery: "",
      phone: "",
      street: "",
      house: "",
      flat: ""
    }
  },
  actions:{
    handleOrder({commit, getters, state}){
      console.log("totalPrice", getters.totalPrice)
      console.log("cart", state.cart)
      console.log(state)
      commit(HANDLE_ORDER)
      router.push("/success")
    },
    changeProductQuantity({commit}, data){
      if(data.product.count == 1 && data.index == -1){
        return
      }
      if(data.count <= 0){
        data.count = 1
      }
      commit(CHANGE_PRODUCT_QUANTITY, data)
    },
    changePizzaConfiguration({commit, state, rootState}, product){
      commit(CHANGE_PIZZA_CONFIGURATION, {rootState, product})
      router.push("/")
    },
    addOrderInfo({commit}, data){
      commit(ADD_ORDER_INFO, data)
    }
  },
  mutations: {
    [HANDLE_ORDER](state){
      state.cart = {}
    },
    [CHANGE_PIZZA_CONFIGURATION](state, {rootState, product}){
      rootState.PizzaConstructor.configuredPizza = {...product}
    },
    [CHANGE_PRODUCT_QUANTITY](state, {count, index, product}){
      let actualCount = count ? count : product.count + index
      state.cart = {...state.cart, [product.id]: {...product, count: actualCount}}
    },
    [ADD_PRODUCT_TO_CART](state, product){
      let productObj = {...product}
      productObj.count = productObj.count ? productObj.count : 1
      state.cart = {...state.cart, [product.id] : productObj}
    },
    [ADD_ORDER_INFO](state, {value, name}){
      state.orderInfo = {...state.orderInfo, [name]: value}
    }
  },
  getters:{
    pizzaProducts(state){
      return Object.fromEntries(
        Object.entries(state.cart).filter(([key, val])=>val.productType === "pizza")
      );
    },
    additionalProducts(state){
      return Object.fromEntries(
        Object.entries(state.cart).filter(([key, val])=>val.productType !== "pizza")
     );
    },
    totalPrice(state){
      return  Object.values(state.cart).reduce((current, product) => current + (product.price * product.count), 0);
    }
  },
};
