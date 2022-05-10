<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <a href="index.html" class="logo layout__logo">
        <img src="img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
      </a>

      <router-link to="/orders" class="layout__link layout__link--active">История заказов</router-link>
      <router-link to="/profile" class="layout__link">Мои данные</router-link>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>

      <section class="sheet order" v-for="order of ordersPrice" :key="order.id">
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #11199929</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: {{order.totalPrice}} ₽</span>
          </div>

          <div class="order__button">
            <button type="button" class="button button--border" @click="deleteOrder(order.id)">Удалить</button>
          </div>
          <div class="order__button">
            <button type="button" class="button" @click="repeatOrderHandle(order)">Повторить</button>
          </div>
        </div>

        <ul class="order__list">
          <li class="order__item" v-for="pizza of order.orderPizzas" :key="pizza.id">
            <div class="product">
              <img src="img/product.svg" class="product__img" width="56" height="56" alt="Капричоза">
              <div class="product__text">
                <h2>{{pizza.name}}</h2>
                <ul>
                  <li>{{getInfo(pizza)}}</li>
                  <li>Соус: {{getSauce(pizza)}}</li>
                  <li>Начинка: {{getIngredients(pizza)}}</li>
                </ul>
              </div>
            </div>

            <p class="order__price">{{getPrice(pizza)}} ₽</p>
          </li>
        </ul>

        <ul class="order__additional">
          <li v-for="misc of order.orderMisc" :key="misc.id">
            <img :src="misc.image" width="20" height="30" :alt="misc.name">
            <p>
              <span>{{misc.name}} </span>
              <b>{{getPrice(misc)}} ₽</b>
            </p>
          </li>
        </ul>

        <p class="order__address">Адрес доставки: Тест (или если адрес новый - писать целиком)</p>
      </section>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { 
  getPizzaInfo, 
  getPizzaSauce, 
  getPizzaIngredients,
  getPizzaPrice
} from '@/common/helpers';
export default{
    async created(){
      await this.getOrders()
    },
    data(){
      return {
     
      }
    },
    computed:{
       ...mapGetters("Orders", ["ordersPrice"]),
       ...mapState("Orders", ["orders"]),
        store(){
          return this.$store.state.PizzaConstructor
        }
    },
    methods:{
        ...mapActions("Order", ["repeatOrder"]),
        ...mapActions("Orders", ["deleteOrder"]),
      repeatOrderHandle(order){
          this.repeatOrder(order)
          this.$router.push('/cart')
      },
      getPrice(product){
        return product.quantity > 1 ? product.quantity + "х" + product.price : product.price
      },
      getInfo(product){
        return getPizzaInfo(product, this.store)
      },
      getSauce(product){
        return getPizzaSauce(product, this.store)
      },
      getIngredients(product){
        return getPizzaIngredients(product, this.store)
      },
      ...mapActions("Orders", ["getOrders"])
    },
    
}
</script>

<style scoped>

</style>
