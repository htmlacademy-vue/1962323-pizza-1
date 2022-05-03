<template>
    <div class="content__ingredients">
        <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
            <div class="sheet__content ingredients">
            <div class="ingredients__sauce">
                <p>Основной соус:</p>
                <RadioButton  
                    v-for="sauce of sauces"
                    label-class="radio ingredients__input"
                    input-class="visually-hidden"
                    name="sauce"
                    :key="sauce.id"
                    :value="sauce.id"
                    :selectedValue="configuredPizza.sauce ? configuredPizza.sauce.id : null"
                    @input="setSouce"
                    >
                    <span>{{sauce.name}}</span>
                </RadioButton>
            </div>
            <div class="ingredients__filling">
                <p>Начинка:</p>
                <ul class="ingredients__list">
                    <li class="ingredients__item" v-for="ingredient of ingredients" :key="ingredient.id">
                        <AppDrag :transfer-data="ingredient">
                            <span :class="`filling filling--${ingredient.class}`">{{ingredient.name}}</span>
                        </AppDrag>
                        <ItemCounter 
                            :ingredient="ingredient"
                            @IngredientsCounterHandler="setIngredientCount"
                        />
                    </li>
                </ul>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import ItemCounter from '@/common/components/ItemCounter'
import RadioButton from '@/common/components/RadioButton'
import AppDrag from '@/common/components/AppDrag'
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    components:{
        ItemCounter,
        RadioButton,
        AppDrag
    },
    computed:{
        ...mapGetters("PizzaConstructor", ["ingredients"]),
        ...mapState("PizzaConstructor", ["sauces", "configuredPizza"])
    },
    methods:{
        ...mapActions("PizzaConstructor", [ "setIngredientCount", "setSouce"])
    }
}
</script>

