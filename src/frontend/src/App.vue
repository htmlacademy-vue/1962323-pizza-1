<template>
  <div>
    <TheHeader v-show="isHeader" />
    <transition :name="$route.meta.transition || 'slide'" >
      <component :is="layout" >
          <router-view />
      </component> 
    </transition>
  </div>
</template>

<script>
  import TheHeader from '@/modules/TheHeader'
  const defaultLayout= "AppLayoutMain"
  export default {
    components:{ TheHeader },
    created() {
        this.$store.dispatch('init');
    },
    name: "App",
    computed: {
      isHeader(){
        return this.$route.meta.layout == defaultLayout
      },
      layout() {
        const layout = this.$route.meta.layout || defaultLayout;
        return () => import(`@/layouts/${layout}.vue`);
      }
    }
  };
</script>


<style lang="scss">
  @import "~@/assets/scss/app";
  
.slide-enter-active {
  transition: all 0.4s
}
.slide-enter {
 
  margin-left: 100%;
}
.slide-leave-active {
  transition: all 0.4s;
  margin-left: -100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  transition: opacity 0s;
  opacity: 0;
  
}
</style>
