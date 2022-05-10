<template>
    <main class="layout">
    <div class="layout__sidebar sidebar">
      <a href="index.html" class="logo layout__logo">
        <img src="img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
      </a>
        <router-link to="/orders" class="layout__link">История заказов</router-link>
        <router-link to="/profile" class="layout__link layout__link--active">Мои данные</router-link>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <div class="user">
        <picture>
          <img :src="user.avatar" :alt="user.name" width="72" height="72">
        </picture>
        <div class="user__name">
          <span>{{user.name}}</span>
        </div>
        <p class="user__phone">Контактный телефон: <span>{{user.phone}}</span></p>
      </div>

      <div class="layout__address">
        <div class="sheet address-form" v-for="address in addresses" :key="address.id">
          <div class="address-form__header">
            <b>{{address.name}}</b>
            <div class="address-form__edit">
              <button type="button" class="icon"><span class="visually-hidden">Изменить адрес</span></button>
            </div>
          </div>
          <p>{{address.street}}, д. {{address.building}}, кв. {{address.flat}}</p>
          <small>{{address.comment}}</small>
        </div>
      </div>

      <div class="layout__address">
        <form action="test.html" method="post" class="address-form address-form--opened sheet">
          <div class="address-form__header">
            <b>Адрес №1</b>
          </div>

          <div class="address-form__wrapper">
            <div class="address-form__input">
              <label class="input">
                <span>Название адреса*</span>
                <input type="text" name="addr-name" v-model="address.name" placeholder="Введите название адреса" required>
              </label>
            </div>
            <div class="address-form__input address-form__input--size--normal">
              <label class="input">
                <span>Улица*</span>
                <input type="text" name="addr-street" v-model="address.street" placeholder="Введите название улицы" required>
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Дом*</span>
                <input type="text" name="addr-house" v-model="address.building" placeholder="Введите номер дома" required>
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Квартира</span>
                <input type="text" name="addr-apartment"  v-model="address.flat" placeholder="Введите № квартиры">
              </label>
            </div>
            <div class="address-form__input">
              <label class="input">
                <span>Комментарий</span>
                <input type="text" name="addr-comment" v-model="address.comment" placeholder="Введите комментарий">
              </label>
            </div>
          </div>

          <div class="address-form__buttons">
            <button type="button" class="button button--transparent">Удалить</button>
            <button type="button" class="button" @click="addNewAddress(address)">Сохранить</button>
          </div>
        </form>
      </div>

      <div class="layout__button">
        <button type="button" class="button button--border" >Добавить новый адрес</button>
      </div>
    </div>
  </main>
</template>
<script>

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    created(){
      this.getAddresses()
    },
    data(){
      return {
        address:{
            name: "",
            street: "",
            building: "",
            flat: "",
            comment: ""
        }
      }
    },
    computed:{
      ...mapState("Auth", ["user"]),
      ...mapState("Profile", ["addresses"])
    },
    methods:{
      ...mapActions("Profile", ["addNewAddress", "getAddresses"])
    }
}

</script>
