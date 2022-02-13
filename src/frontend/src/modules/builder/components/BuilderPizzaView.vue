<template>
    <div class="content__pizza">
        <TextInput
            :name="'pizza_name'"
            :placeholder="'Введите название пиццы'"
            @input="TextHandler"
        />
        <AppDrop @drop="moveTask">
            <div class="content__constructor">
                <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                    <div class="pizza__filling pizza__filling--ananas"></div>
                    <div class="pizza__filling pizza__filling--bacon"></div>
                    <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
                </div>
            </div>
        </AppDrop>
        <div class="content__result">
            <p>Итого: <span>{{total_prise}} ₽</span></p>
            <button type="button" class="button" disabled>Готовьте!</button>
        </div>
    </div>
</template>

<script>
//import BuilderPriceCounter from '@/modules/builder/components/BuilderPriceCounter'
import TextInput from '@/common/components/TextInput'
import AppDrop from '@/common/components/AppDrop'
export default {
    props:{
        total_prise:{
            type:Number,
            required:true
        },
        ingredients_counter:{
            type: Object,
            required:true
        }
    },
    components:{
        TextInput,
        AppDrop
    },
    methods:{
        TextHandler(value){
            this.$emit("input", value)
        },
        moveTask(ingridient){
            let count = ingridient.value
            let result = count ? count += 1 : 1
            count = result
            if(result > this.ingredients_counter.max) {
                count = this.ingredients_counter.max
            }
            this.$emit("IngredientsCounterHandler", count, ingridient.id)
        }
    }
}
</script>

