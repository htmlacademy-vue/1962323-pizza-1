
import { 
    ADD_PRODUCT_TO_CART,
    CHANGE_PRODUCT_QUANTITY,
    HANDLE_ORDER,
    ADD_ADDRESS_INFO,
    SET_DEFAULT_QUANTITY_TO_PRODUCTS,
    REPEAT_ORDER
} from "@/store/mutation-types";

import additionalProducts from '@/static/misc.json'
export default {
  namespaced: true,
  state: {
    phone:"",
    cart: [...additionalProducts],
    address: {
      street: "",
      building: "",
      flat: "",
      comment: ""
    }, 
    // orderInfo: {
    //   delivery: "",
    //   phone: "",
    //   street: "",
    //   house: "",
    //   flat: ""
    // }
  },
  actions:{
    async handleOrder({commit, getters, state, rootState}){
      let order = {}
      order.phone = state.phone
      order.address = state.address
      order.userId = rootState.Auth.user.id

      let pizzas = state.cart.filter(product => product.productType == "pizza" && product.quantity > 0)
      let misc = state.cart.filter(product => product.productType != "pizza" && product.quantity > 0)

      order.pizzas = pizzas.map(pizza => {
        return {
          name: pizza.name,
          sauceId: pizza.sauceId,
          doughId: pizza.doughId,
          sizeId: pizza.sizeId,
          quantity: pizza.quantity,
          ingredients:pizza.ingredients
        }
      })

      order.misc = misc.map(product => {
        return {
          miscId: product.id,
          quantity: product.quantity
        }
      })

      let response = await this.$api.orders.createOrder(order)
      console.log("order", response)

      commit(HANDLE_ORDER)
    },
    changeProductQuantity({commit}, data){
      if(data.quantity <= 0){
        data.quantity = 1
      }
      commit(CHANGE_PRODUCT_QUANTITY, data)
    },
    addAddress({commit}, data){
      commit(ADD_ADDRESS_INFO, data)
    },
    addCountToProductsInCart({commit}){
      commit(SET_DEFAULT_QUANTITY_TO_PRODUCTS)
    },
    repeatOrder({commit}, order){
        commit(REPEAT_ORDER, order)
    }
  },
  mutations: {
    [HANDLE_ORDER](state){
      state.cart =  [...additionalProducts]
    },
    [CHANGE_PRODUCT_QUANTITY](state, {quantity, id}){
      state.cart.find(elem => elem.id === id).quantity = quantity
    },
    [ADD_PRODUCT_TO_CART](state, product){
      product = {...product, quantity: product.quantity ? product.quantity : 1}
      let index = state.cart.findIndex(elem => elem.id === product.id)
      if(index == -1){
        state.cart.push(product)
      }else{
        state.cart.splice(index, 1, product);
      }
    },
    [ADD_ADDRESS_INFO](state, {value, name}){
      if(name == "phone"){
        state[name] = value
      }else{
        state.address = {...state.address, [name]: value}
      }
    },
    [SET_DEFAULT_QUANTITY_TO_PRODUCTS](state){
      state.cart = state.cart.map(product => ({...product, quantity: product.quantity ? product.quantity : 0}))
    },
    [REPEAT_ORDER](state, order){
        state.cart = [...order.orderPizzas, ...order.orderMisc]
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
      return state.cart.reduce((current, product) => current + (product.price * product.quantity), 0);
    }
  },
};
