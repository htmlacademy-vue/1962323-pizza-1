<template>
    <div>
        <Header/>
        <router-view  />
    </div>
</template>
<script>
import Header from '@/modules/Header'
export default {
  components:{ Header }
}
</script>

