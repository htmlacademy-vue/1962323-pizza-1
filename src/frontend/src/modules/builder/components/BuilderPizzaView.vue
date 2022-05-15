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
                <div :class="`pizza pizza--foundation--${getViewClass}`">
                <div class="pizza__wrapper">
                    <div :class="`pizza__filling pizza__filling--${ingredient.class}`" v-for="ingredient in choosenIngredients" :key="ingredient.id"></div>    
                </div>
                </div>
            </div>
        </AppDrop>
        <div class="content__result">
            <p>Итого: <span>{{totalPrice}} ₽</span></p>
            <button type="button" class="button"  @click="addToCart" :disabled="choosenIngredients.length == 0 || !configuredPizza.name">Готовьте!</button>
        </div>
    </div>
</template>

<script>
//import BuilderPriceCounter from '@/modules/builder/components/BuilderPriceCounter'
import TextInput from '@/common/components/TextInput'
import AppDrop from '@/common/components/AppDrop'
import { ingredientsCounter } from '@/static/consts.json'
import { mapState, mapActions, mapGetters } from "vuex";
import { getElemFromStore } from '@/common/helpers';
export default {
    components:{
        TextInput,
        AppDrop
    },
    methods:{
        addToCart(){
            this.addPizzaToCart()
            this.$router.push("/cart")
        },  
        ...mapActions("PizzaConstructor", ["setIngredientCount", "setPizzaName", "addPizzaToCart"]),
        moveTask(ingridient){
            let quantity = ingridient.quantity
            let result = quantity ? quantity += 1 : 1
            quantity = result
            if(result > this.ingredientsCounter.max) {
                quantity = this.ingredientsCounter.max
            }
            this.setIngredientCount({quantity, id: ingridient.id})
        }
    },
    computed:{
        ingredientsCounter(){
            return ingredientsCounter
        },
        ...mapGetters("PizzaConstructor", ["totalPrice", "ingredients"]),
        ...mapState("PizzaConstructor", ["configuredPizza"]),
        choosenIngredients(){
            return this.ingredients.filter(ingredient => ingredient.quantity && ingredient.quantity > 0)
        },
        getViewClass(){
            let dough = getElemFromStore(this.$store.state.PizzaConstructor, "dough", this.configuredPizza.doughId)
            let sauce = getElemFromStore(this.$store.state.PizzaConstructor, "sauces", this.configuredPizza.sauceId)
            let doughClass = dough ? dough.class : 'large'
            let sauceClass = sauce ? sauce.class : 'creamy'
            return doughClass + "-" + sauceClass
        }
    }
}
</script>

