<template>
    <div :class="`counter ${counterClass}`">
        <button type="button" :class="`counter__button counter__button--minus ${minusClass}`"  @click="changeCounter('decrement', -1, product.count)" :disabled="decrementDisabled">
            <span class="visually-hidden">Меньше</span>
        </button>
        <input type="text" :name="`counter-${product.id}`" class="counter__input" :value="product.count" @change="changeCounter('input', Number($event.target.value), product.count)">
        <button type="button" :class="`counter__button counter__button--plus ${plusClass}`" @click="changeCounter('increment', 1, product.count)" :disabled="incrementDisabled">
            <span class="visually-hidden">Больше</span>
        </button>
    </div>
</template>
<script>
export default {
   props:{
        product:{
           type: Object,
           required: true
        },
        range:{
            type: Object,
            required: false
        },
        counterClass:{
           type: String,
           default: ""
        },
        plusClass:{
            type: String,
            default: ""
        },
        minusClass:{
            type: String,
            default: ""
       }
   },
   computed:{
     decrementDisabled(){
        if(this.range){
            return this.isDisabled("min")
        }
        if(this.product.count == 0){
            return true
        }
        return false
     },
     incrementDisabled(){
        if(this.range){
            return this.isDisabled("max")
        }
        return false
     }
   },
   methods:{
       isDisabled(type){
           if(this.range.hasOwnProperty(type)){
               return this.product.count == this.range[type]
           }
           return false
       },
       changeCounter(changeType, prefix, value) {
            if(changeType == "input"){
                value = 0
            }
            let result = value + prefix
            let count = result
            if (result < 0) {
                count = 0;
            }
            if (this.range && result > this.range.max) {
                count = this.range.max
            }
            this.$emit('counterHandler', {count, id: this.product.id})
       }
   }
}
</script>

