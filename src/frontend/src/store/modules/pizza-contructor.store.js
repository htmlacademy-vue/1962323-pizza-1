import Vue from "vue";
import { 
  SET_SIZE, 
  SET_SOUCE, 
  SET_DOUGH, 
  SET_INGREDIENT_COUNT, 
  SET_CLASS_TO_ELEMS,
  SET_NAME,
  CLEAR_PIZZA_CONFIGURATION,
  ADD_PRODUCT_TO_CART,
  CHANGE_PIZZA_CONFIGURATION
} from "@/store/mutation-types";

import fulldata from '@/static/pizza.json'
import consts from '@/static/consts.json'
export default {
  namespaced: true,
  state: {
    ...fulldata,
    configuredPizza:{
      id: Math.floor(Math.random() * 100000) + 1 + "",
      productType: "pizza",
      sauce: null,
      size: null,
      dough: null,
      price: null,
      name: null,
      ingredients: {},
      priceData: {},
    },
    priceMultiplier: 1,
  },
  actions:{
    setDough({commit}, id){
      commit(SET_DOUGH, id)
    },
    setSouce({commit}, id){
      commit(SET_SOUCE, id)
    },
    setSize({commit}, id){
      commit(SET_SIZE, id)
    },
    setIngredientCount({commit}, data){
      commit(SET_INGREDIENT_COUNT, data)
    },
    setClassToElems({commit}){
      let types = ["dough", "sizes", "ingredients", "sauces"]
      commit(SET_CLASS_TO_ELEMS, types)
    },
    setPizzaName({commit}, name){
      commit(SET_NAME, name)
    },
    addPizzaToCart({commit, state, getters}){
      let product = {...state.configuredPizza, price: getters.totalPrice}
      commit('Order/' + ADD_PRODUCT_TO_CART, product, { root: true })
      commit(CLEAR_PIZZA_CONFIGURATION)
      
    },
    changePizzaConfiguration({commit}, product){
      commit(CHANGE_PIZZA_CONFIGURATION, product)
    },
  },
  mutations: {
    [SET_NAME](state, name){
      state.configuredPizza.name = name
    },
    [SET_DOUGH](state, id){
      let dough = state.dough.find(elem => elem.id == id)
      state.configuredPizza.dough = {...dough, class: dough.class == "large" ? "big" : "small"} 
      state.configuredPizza.priceData = {...state.configuredPizza.priceData, 'dough': dough.price}
    },
    [SET_SOUCE](state, id){
        let sauce = state.sauces.find(elem => elem.id == id)
        state.configuredPizza.sauce = {...sauce}
        state.configuredPizza.priceData = {...state.configuredPizza.priceData, 'sauce': sauce.price}
    },
    [SET_SIZE](state, id){
      let size = state.sizes.find(elem => elem.id == id)
      state.priceMultiplier = size.multiplier
      state.configuredPizza.size = {...size}
    },
    [SET_INGREDIENT_COUNT](state, {id, count}){
      let ingredient = state.ingredients.find(elem => elem.id == id) 
      state.configuredPizza.ingredients = {...state.configuredPizza.ingredients, [ingredient.id]: {...ingredient, count}}
      if(count == 0){
        Vue.delete(state.configuredPizza.ingredients, ingredient.id)
      }
      state.configuredPizza.priceData = {...state.configuredPizza.priceData, [`ingridient_${id}`]: state.ingredients.find(elem => elem.id == id).price * count}
    },
    [SET_CLASS_TO_ELEMS](state, types){
        types.forEach(type=>{
          state[type] = state[type].map( elem => ({...elem, class: consts.classes[type][elem.id]}));  
        })
    },
    [CLEAR_PIZZA_CONFIGURATION](state){
      //todo - разобраться с очищением текущего билда пиццы
      state.configuredPizza = {
        id: Math.floor(Math.random() * 10000000) + 1  + "",
        productType: "pizza",
        ingredients: {},
        priceData: {}
      }
    },
    [CHANGE_PIZZA_CONFIGURATION](state, product){
      state.configuredPizza = {...product}
    },
  },
  getters:{
    totalPrice(state){
      return Object.values(state.configuredPizza.priceData).reduce((current, key) => current + key, 0) * state.priceMultiplier;
    },
    ingredients(state){
      return [...state.ingredients].map(ingredient => {
        let selectedIngredient = state.configuredPizza.ingredients ? state.configuredPizza.ingredients[ingredient.id] : null
        return {...ingredient, count: selectedIngredient ? selectedIngredient.count : 0}
      })
    }
  },
};
