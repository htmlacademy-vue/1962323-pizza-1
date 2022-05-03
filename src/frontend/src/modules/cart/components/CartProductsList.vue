<template>
<div>
     <ul class="cart-list sheet">
          <li class="cart-list__item" v-for="product in pizzaProducts" :key="product.id">
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

            <div class="counter cart-list__counter">
              <button type="button" class="counter__button counter__button--minus" @click="changeProductQuantity({index: -1, product})">
                <span class="visually-hidden">Меньше</span>
              </button>
              <input type="text" name="counter" class="counter__input" :value="product.count" @change="changeProductQuantity({count: Number($event.target.value), product})">
              <button type="button" class="counter__button counter__button--plus counter__button--orange" @click="changeProductQuantity({index: 1, product})">
                <span class="visually-hidden">Больше</span>
              </button>
            </div>

            <div class="cart-list__price">
              <b>{{product.price}} ₽</b>
            </div>

            <div class="cart-list__button">
              <button type="button" class="cart-list__edit" @click="changePizzaConfiguration(product)">Изменить</button>
            </div>
          </li>
     </ul>
        
    <div class="cart__additional">
          <ul class="additional-list">
            <li class="additional-list__item sheet" v-for="product in additionalProducts" :key="product.id">
              <p class="additional-list__description">
               <img :src="product.image" width="39" height="60" alt="Coca-Cola 0,5 литра" />
                <span>{{product.name}}</span>
              </p>

              <div class="additional-list__wrapper">
                <div class="counter additional-list__counter">
                  <button type="button" class="counter__button counter__button--minus" @click="changeProductQuantity({index: -1, product})">
                    <span class="visually-hidden">Меньше</span>
                  </button>
                  <input type="text" name="counter" class="counter__input" :value="product.count" @change="changeProductQuantity({count: Number($event.target.value), product})">
                  <button type="button" class="counter__button counter__button--plus counter__button--orange" @click="changeProductQuantity({index: 1, product})">
                    <span class="visually-hidden">Больше</span>
                  </button>
                </div>

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
export default {
    computed:{
        ...mapGetters("Order", ["pizzaProducts", "additionalProducts"])
    },
    methods:{
      ...mapActions("Order", ["changePizzaConfiguration", "changeProductQuantity"]),
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

