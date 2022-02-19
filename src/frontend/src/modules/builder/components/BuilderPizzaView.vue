<template>
    <div class="content__pizza">
        <TextInput
            name="pizza_name"
            place-holder="Введите название пиццы"
            @input="TextHandler"
        />
        <AppDrop @drop="moveTask">
            <div class="content__constructor">
                <div :class="`pizza pizza--foundation--${selectedDough}-${selectedSauce}`">
                <div class="pizza__wrapper">
                    <div :class="`pizza__filling pizza__filling--${ingredient.class}`" v-for="ingredient in choosenIngredients" :key="ingredient.id"></div>    
                </div>
                </div>
            </div>
        </AppDrop>
        <div class="content__result">
            <p>Итого: <span>{{totalPrise}} ₽</span></p>
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
        totalPrise:{
            type:Number,
            required:true
        },
        ingredientsCounter:{
            type: Object,
            required:true
        },
        ingredients:{
            type: Array,
            required:true
        },
        selectedDough:{
            type: String,
            default: ""
        },
        selectedSauce:{
            type: String,
            default: ""
        }
    },
    components:{
        TextInput,
        AppDrop
    },
    methods:{
        TextHandler(value){
            this.$emit("TextHandler", value)
        },
        moveTask(ingridient){
            let count = ingridient.count
            let result = count ? count += 1 : 1
            count = result
            if(result > this.ingredientsCounter.max) {
                count = this.ingredientsCounter.max
            }
            this.$emit("IngredientsCounterHandler", count, ingridient.id)
        }
    },
    computed:{
        choosenIngredients(){
            return this.ingredients.filter(ingredient => ingredient.count && ingredient.count > 0)
        }
    }
}
</script>

