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
                        <transition-group name="fade">
                            <div v-for="ingredient in choosenIngredients" :key="ingredient.id">
                                <transition name="fade">
                                    <div :class="`pizza__filling pizza__filling--${ingredient.class}`"  v-show="ingredient.quantity >= 1"></div>
                                </transition>
                                <transition name="fade">
                                    <div :class="`pizza__filling pizza__filling--${ingredient.class} pizza__filling--second`" v-show="ingredient.quantity >= 2"></div>  
                                </transition> 
                                <transition name="fade">
                                    <div :class="`pizza__filling pizza__filling--${ingredient.class} pizza__filling--third`" v-show="ingredient.quantity >= 3"></div> 
                                </transition> 
                            </div>
                        </transition-group>
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
import TextInput from '@/common/components/TextInput'
import AppDrop from '@/common/components/AppDrop'
import { ingredientsCounter } from '@/static/consts.json'
import { mapState, mapActions, mapGetters } from "vuex";
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
        ...mapGetters("PizzaConstructor", ["totalPrice", "ingredients", "getPizzaComponent"]),
        ...mapState("PizzaConstructor", ["configuredPizza"]),
        choosenIngredients(){
            return this.ingredients.filter(ingredient => ingredient.quantity && ingredient.quantity > 0)
        },
        getViewClass(){
            let dough = this.getPizzaComponent("dough", this.configuredPizza.doughId)
            let sauce = this.getPizzaComponent("sauces", this.configuredPizza.sauceId)
            let doughClass = dough ? dough.class : 'large'
            let sauceClass = sauce ? sauce.class : 'creamy'
            return doughClass + "-" + sauceClass
        }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>