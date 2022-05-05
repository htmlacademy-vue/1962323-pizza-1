<template>
<div>
     <ul class="cart-list sheet">
          <li class="cart-list__item" v-for="product of pizzaProducts" :key="product.id">
            <div class="product cart-list__product">
              <img src="img/product.svg" class="product__img" width="56" height="56" alt="Капричоза">
              <div class="product__text">
                <h2>{{product.name}}</h2>
                <ul>
                  <li>{{getPizzainfo(product)}}</li>
                  <li>Соус: {{getSauce(product)}}</li>
                  <li>Начинка: {{getIngredients(product)}}</li>
                </ul>
              </div>
            </div>
            <ItemCounter 
                :product="product"
                counterClass="cart-list__counter"
                plusClass="counter__button--orange"
                @counterHandler="changeProductQuantity"
            />
            <div class="cart-list__price">
              <b>{{product.price}} ₽</b>
            </div>

            <div class="cart-list__button">
              <button type="button" class="cart-list__edit" @click="changePizza(product)">Изменить</button>
            </div>
          </li>
     </ul>
        
    <div class="cart__additional">
          <ul class="additional-list">
            <li class="additional-list__item sheet" v-for="product of additionalProducts" :key="product.id">
              <p class="additional-list__description">
               <img :src="product.image" width="39" height="60" alt="Coca-Cola 0,5 литра" />
                <span>{{product.name}}</span>
              </p>
              <div class="additional-list__wrapper">
                  <ItemCounter 
                    :product="product"
                    counterClass="additional-list__counter"
                    plusClass="counter__button--orange"
                    @counterHandler="changeProductQuantity"
                />
                <div class="additional-list__price">
                  <b>× {{product.price}} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ItemCounter from '@/common/components/ItemCounter'
import consts from '@/static/consts.json'
import router from '@/router'
export default {
    components:{
      ItemCounter
    },
    computed:{
        ...mapGetters("Order", ["pizzaProducts", "additionalProducts"]),
        ingredientsCounter(){
          return consts.ingredientsCounter
        }
    },
    methods:{
      changePizza(product){
        this.changePizzaConfiguration(product)
        router.push("/")
      },
      ...mapActions("PizzaConstructor", ["changePizzaConfiguration"]),
      ...mapActions("Order", ["changeProductQuantity"]),
        getPizzainfo(product){
            let info = []
            if(product.size){
                info.push(product.size.name)
            }
            if(product.dough){
                info.push(product.dough.description)
            }
            return info.join(", ")
        },
        getSauce(product){
            return product.sauce ? product.sauce.name : "без соуса"
        },
        getIngredients(product){
            let ingredientsList = Object.keys(product.ingredients).map(key => product.ingredients[key].name).join(", ")
            return (ingredientsList ? ingredientsList : "без начинки")
        }
    }
}
</script>

