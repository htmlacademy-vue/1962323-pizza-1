import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";
import { setAuth } from '@/common/helpers';
import { 
  SET_ENTITY
} from "@/store/mutation-types";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  getters: {},
  actions:{

    async getAddresses({commit}) {
      let result = await this.$api.profile.getAddresses()
      commit(
        SET_ENTITY,
        { module: 'Profile', entity: 'addresses', value: result }
      );
    },

    async getSizesData({commit, dispatch}){
      const sizes  = await this.$api.pizza.getSizes()
      commit(
        SET_ENTITY,
        { module: 'PizzaConstructor', entity: 'sizes', value:sizes }
      );
      dispatch('PizzaConstructor/setClassesToElems', 'sizes', { root: true })
    },

    async getIngredientsData({commit, dispatch}){
      const ingredients  = await this.$api.pizza.getIngredients()
      commit(
        SET_ENTITY,
        { module: 'PizzaConstructor', entity: 'ingredients', value: ingredients }
      );
      dispatch('PizzaConstructor/setClassesToElems', 'ingredients', { root: true })
    },

    async getSaucesData({commit, dispatch}){
      const sauces  = await this.$api.pizza.getSauces()
      commit(
        SET_ENTITY,
        { module: 'PizzaConstructor', entity: 'sauces', value: sauces }
      );
      dispatch('PizzaConstructor/setClassesToElems', 'sauces', { root: true })
    },

    async getDoughData({commit, dispatch}){
      const dough  = await this.$api.pizza.getDough()
      commit(
        SET_ENTITY,
        { module: 'PizzaConstructor', entity: 'dough', value: dough }
      );
      dispatch('PizzaConstructor/setClassesToElems', 'dough', { root: true })
    },

    async getPizzaData({commit, dispatch}){
      dispatch("getSizesData")
      dispatch("getIngredientsData")
      dispatch("getSaucesData")
      dispatch("getDoughData")
    },

    async getMiscData({commit, dispatch}){
      const misc  = await this.$api.pizza.getMisc()
      commit(
        SET_ENTITY,
        { module: 'Order', entity: 'cart', value: misc }
      );
      dispatch('Order/addCountToProductsInCart', null, { root: true })
    },
    
    init({dispatch, state}){
      dispatch("getMiscData")
      dispatch("getPizzaData")
      if (this.$jwt.getToken()) {
        setAuth(this);
        dispatch("getAddresses")
      }
    }
    
  },
  mutations: {
    [SET_ENTITY](state, { module, entity, value }) { module ? state[module][entity] = value : state[entity] = value },
  },
  modules,
  plugins: [VuexPlugins],
});
