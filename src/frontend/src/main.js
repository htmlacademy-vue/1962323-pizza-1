import Vue from "vue";
import App from "./App.vue";
import router from './router';
import store from "./store";
import '@/plugins/vuePlugins';
Vue.config.productionTip = false;

/*1*/
new Vue({
  store,
  render: (h) => h(App),
  router
}).$mount("#app");
