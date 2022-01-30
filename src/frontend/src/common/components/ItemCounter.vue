<template>
    <div class="counter counter--orange ingredients__counter">
        <button type="button" class="counter__button counter__button--minus"  @click="()=>changeCounter(-1)">
            <span class="visually-hidden">Меньше</span>
        </button>
        <input type="text" :name="`counter-${ingredient.id}`" class="counter__input" :value="value" disabled>
        <button type="button" class="counter__button counter__button--plus" @click="()=>changeCounter(1)">
            <span class="visually-hidden">Больше</span>
        </button>
    </div>
</template>
<script>

export default {
   props:["ingredient"],
   data(){
       return {
           value:0
       }
   },
   methods:{
       changeCounter(prefix){
           let result = this.value + prefix
           if(result == -1){
                this.value = 0
           }else{
                this.value = result
           }
           this.$emit('handleCounter', this.value, this.ingredient.id)
       }
   }
}
</script>

