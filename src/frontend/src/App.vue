<template>
   <component :is="layout" >
     <router-view />
    </component>
</template>
<script>
  const defaultLayout= "AppLayoutMain"
  export default {
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
