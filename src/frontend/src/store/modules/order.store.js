
import { 
    ADD_PRODUCT_TO_CART,
    CHANGE_PRODUCT_QUANTITY,
    HANDLE_ORDER,
    ADD_ORDER_INFO
} from "@/store/mutation-types";


import additionalProducts from '@/static/misc.json'
export default {
  namespaced: true,
  state: {
    cart: [...additionalProducts],
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
    },
    changeProductQuantity({commit}, data){
      if(data.count <= 0){
        data.count = 1
      }
      commit(CHANGE_PRODUCT_QUANTITY, data)
    },
    addOrderInfo({commit}, data){
      commit(ADD_ORDER_INFO, data)
    }
  },
  mutations: {
    [HANDLE_ORDER](state){
      state.cart = []
    },
    [CHANGE_PRODUCT_QUANTITY](state, {count, id}){
      state.cart.find(elem => elem.id === id).count = count
    },
    [ADD_PRODUCT_TO_CART](state, product){
      product = {...product, count: product.count ? product.count : 1}
      let index = state.cart.findIndex(elem => elem.id === product.id)
      if(index == -1){
        state.cart.push(product)
      }else{
        state.cart.splice(index, 1, product);
      }
    },
    [ADD_ORDER_INFO](state, {value, name}){
      state.orderInfo = {...state.orderInfo, [name]: value}
    }
  },
  getters:{
    pizzaProducts(state){
      return state.cart.filter(elem => elem.productType === "pizza")
    },
    additionalProducts(state){
      return state.cart.filter(elem => elem.productType !== "pizza")
    },
    totalPrice(state){
      return state.cart.reduce((current, product) => current + (product.price * product.count), 0);
    }
  },
};
