<template>
    <div class="content__ingredients">
        <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
            <div class="sheet__content ingredients">
            <div class="ingredients__sauce">
                <p>Основной соус:</p>
                <RadioButton  
                    v-for="sauce of fulldata.sauces" 
                    :label_class="'radio ingredients__input'" 
                    :input_class="'visually-hidden'"
                    :name="'sauce'" 
                    :key="sauce.id" 
                    :value="sauce" 
                    >
                    <span>{{sauce.name}}</span>
                </RadioButton>
            </div>
            <div class="ingredients__filling">
                <p>Начинка:</p>
                <ul class="ingredients__list">
                <li class="ingredients__item" v-for="ingredient of fulldata.ingredients" :key="ingredient.id">
                    <span :class="`filling filling--${get_class(classes.ingredients, ingredient.id)}`">{{ingredient.name}}</span>
                    <ItemCounter :ingredient="ingredient"/>
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
export default {
    components:{
        ItemCounter,
        RadioButton
    },
    props:["fulldata", "classes", "get_class"]
}
</script>

