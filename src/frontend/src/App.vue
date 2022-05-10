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
    if (this.$jwt.getToken()) {
        setAuth(this.$store);
    }
  //  this.$store.dispatch('init');
  },
    name: "App",
      computed: {
      layout() {
        const layout = this.$route.meta.layout || defaultLayout;
        return () => import(`@/layouts/${layout}.vue`);
      }
    }
  };
</script>

<style lang="scss">
  @import "~@/assets/scss/app";
</style>
