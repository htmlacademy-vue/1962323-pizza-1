import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";

import { 
  SET_ENTITY
} from "@/store/mutation-types";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  getters: {},
  actions:{},
  mutations: {
    [SET_ENTITY](state, { module, entity, value }) { module ? state[module][entity] = value : state[entity] = value }
  },
  modules,
  plugins: [VuexPlugins],
});
