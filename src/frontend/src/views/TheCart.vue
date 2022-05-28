<template>
    <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>
        <!-- <div class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div> -->
        <CartProductsList/>
        <OrderInfo/>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
          <router-link to="/" class="button button--border button--arrow">Хочу еще одну</router-link>
      </div>
      <p class="footer__text">Перейти к конструктору<br>чтоб собрать ещё одну пиццу</p>
      <div class="footer__price">
        <b>Итого: {{totalPrice}} ₽</b>
      </div>
      <div class="footer__submit">
        <button type="button" class="button" @click="createOrder">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>
<script>
import CartProductsList from '@/modules/cart/components/CartProductsList'
import OrderInfo from '@/modules/cart/components/OrderInfo'

import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
export default {
  components:{
    CartProductsList,
    OrderInfo
  },
  computed:{
    ...mapGetters("Order", ["totalPrice"])
  },
  methods:{
      createOrder(){
        this.handleOrder()
        router.push("/success")
      },
    ...mapActions("Order",["handleOrder"])
  }
}
</script>
