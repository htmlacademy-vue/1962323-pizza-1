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
  CHANGE_PIZZA_CONFIGURATION,
} from "@/store/mutation-types";

import { classes, defaultPizzaValues } from '@/static/consts.json'
import { getPizzaPrice } from '@/common/helpers';
export default {
  namespaced: true,
  state: {
    sauces:[],
    dough:[],
    ingredients:[],
    sizes:[],
    configuredPizza:{
      id: Math.floor(Math.random() * 100000),
      ingredients: [],
      ...defaultPizzaValues
    }
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
    setClassesToElems({commit}, type){
     commit(SET_CLASS_TO_ELEMS, type)
   }
  },
  mutations: {
    [SET_NAME](state, name){
      state.configuredPizza.name = name
    },
    [SET_DOUGH](state, id){
      state.configuredPizza.doughId = id
    },
    [SET_SOUCE](state, id){
        state.configuredPizza.sauceId = id
    },
    [SET_SIZE](state, id){
      state.configuredPizza.sizeId = id
    },
    [SET_INGREDIENT_COUNT](state, {id, quantity}){
      let ingredient = {ingredientId: id, quantity}
      let ingredientIndex = state.configuredPizza.ingredients.findIndex(elem => elem.ingredientId == id) 
      if(ingredientIndex != -1){
        Vue.set(state.configuredPizza.ingredients, ingredientIndex, ingredient)
      }else{
        state.configuredPizza.ingredients.push(ingredient)
      }
      if(quantity == 0 && ingredientIndex != -1){
        Vue.delete(state.configuredPizza.ingredients, ingredientIndex)
      }
    },
    [SET_CLASS_TO_ELEMS](state, type){
      if(state[type].length){
        state[type] = state[type].map( elem => ({...elem, class: classes[type][elem.id]}));  
      }
    },
    [CLEAR_PIZZA_CONFIGURATION](state){
      //todo - разобраться с очищением текущего билда пиццы
      state.configuredPizza = {
        id: Math.floor(Math.random() * 100000),
        ingredients: [],
        ...defaultPizzaValues
      }
    },
    [CHANGE_PIZZA_CONFIGURATION](state, product){
      state.configuredPizza = {...product}
    },
  },
  getters:{
    totalPrice(state){
      return getPizzaPrice(
        state.sauces,
        state.dough,
        state.ingredients,
        state.sizes, 
        state.configuredPizza
      )
    },
    ingredients(state){
      return [...state.ingredients].map(ingredient => {
        let selectedIngredient = state.configuredPizza.ingredients.find(elem => elem.ingredientId == ingredient.id)
        return {...ingredient, quantity: selectedIngredient ? selectedIngredient.quantity : 0}
      })
    },
    getPizzaComponent: (state) => (type, id) => {
      return state[type].find(elem => elem.id == id)
    }
  },
};
