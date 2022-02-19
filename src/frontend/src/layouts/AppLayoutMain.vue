<template>
    <div>
        <Header/>
        <slot/>
    </div>
</template>
<script>
import Header from '@/modules/Header'
export default {
  components:{ Header }
}
</script>

