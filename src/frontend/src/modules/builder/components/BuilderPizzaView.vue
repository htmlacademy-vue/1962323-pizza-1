<template>
    <div class="content__pizza">
        <TextInput
            name="pizza_name"
            place-holder="Введите название пиццы"
            :value = "configuredPizza.name"
            @input="setPizzaName"
        />
        <AppDrop @drop="moveTask">
            <div class="content__constructor">
                <div :class="`pizza pizza--foundation--${configuredPizza.dough ? configuredPizza.dough.class : 'big'}-${configuredPizza.sauce ? configuredPizza.sauce.class : 'creamy'}`">
                <div class="pizza__wrapper">
                    <div :class="`pizza__filling pizza__filling--${ingredient.class}`" v-for="ingredient in choosenIngredients" :key="ingredient.id"></div>    
                </div>
                </div>
            </div>
        </AppDrop>
        <div class="content__result">
            <p>Итого: <span>{{totalPrice}} ₽</span></p>
            <button type="button" class="button"  @click="addPizzaToCart">Готовьте!</button>
        </div>
    </div>
</template>

<script>
//import BuilderPriceCounter from '@/modules/builder/components/BuilderPriceCounter'
import TextInput from '@/common/components/TextInput'
import AppDrop from '@/common/components/AppDrop'
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    components:{
        TextInput,
        AppDrop
    },
    methods:{
        ...mapActions("PizzaConstructor", ["setIngredientCount", "setPizzaName", "addPizzaToCart"]),
        moveTask(ingridient){
            let count = ingridient.count
            let result = count ? count += 1 : 1
            count = result
            if(result > this.ingredientsCounter.max) {
                count = this.ingredientsCounter.max
            }
            this.setIngredientCount({count, id: ingridient.id})
        }
    },
    computed:{
        ...mapGetters("PizzaConstructor", ["totalPrice", "ingredients"]),
        ...mapState("PizzaConstructor", ["ingredientsCounter","configuredPizza"]),
        choosenIngredients(){
            return this.ingredients.filter(ingredient => ingredient.count && ingredient.count > 0)
        }
    }
}
</script>

