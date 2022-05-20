<template>
   <component :is="layout" >
     <router-view />
    </component>
</template>
<script>
  import {mapActions, mapState } from "vuex";

  const defaultLayout= "AppLayoutMain"
  export default {
    created() {
        this.$store.dispatch('init');
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
