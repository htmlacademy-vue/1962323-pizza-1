<template>
   <component :is="layout" >
     <router-view />
    </component>
</template>
<script>
  import {mapActions } from "vuex";
  import { setAuth } from '@/common/helpers';
  const defaultLayout= "AppLayoutMain"
  export default {
    created() {
       this.getMiscData()
       this.getPizzaData()
      if (this.$jwt.getToken()) {
          setAuth(this.$store);
           this.getAddresses()
      }
  //  this.$store.dispatch('init');
  },
    name: "App",
      computed: {
      layout() {
        const layout = this.$route.meta.layout || defaultLayout;
        return () => import(`@/layouts/${layout}.vue`);
      }
    },
    methods:{
      ...mapActions("PizzaConstructor", ["getPizzaData", "getMiscData"]),
      ...mapActions("Profile", ["getAddresses"])
    }

  };
</script>

<style lang="scss">
  @import "~@/assets/scss/app";
</style>
