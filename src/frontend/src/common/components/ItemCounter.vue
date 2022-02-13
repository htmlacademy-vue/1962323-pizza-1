<template>
    <div class="counter counter--orange ingredients__counter">
        <button type="button" class="counter__button counter__button--minus"  @click="changeCounter(-1, inputValue)" :disabled="inputValue == ingredients_counter.min">
            <span class="visually-hidden">Меньше</span>
        </button>
        <input type="text" :name="`counter-${ingredient.id}`" class="counter__input" :value="inputValue" disabled>
        <button type="button" class="counter__button counter__button--plus" @click="changeCounter(1, inputValue)" :disabled="inputValue == ingredients_counter.max">
            <span class="visually-hidden">Больше</span>
        </button>
    </div>
</template>
<script>

export default {
   props:{
       ingredient:{
           type: Object,
           required: true
       },
       ingredients_counter:{
           type: Object,
           required: true
       }
   },
   computed:{
        inputValue(){
           return this.ingredient.value ? this.ingredient.value : 0
        }
   },
   methods:{
       changeCounter(prefix, value) {
            let result = value + prefix
            let count = result
            if (result == -1) {
               count = 0;
            }
            if (result > this.ingredients_counter.max) {
                count = this.ingredients_counter.max
            }
           this.$emit('IngredientsCounterHandler', count, this.ingredient.id)
       }
   }
}
</script>

