<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <!-- <a href="index.html" class="logo layout__logo">
        <img src="img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
      </a> -->
      <router-link to="/orders" class="layout__link"
        >История заказов</router-link
      >
      <router-link to="/profile" class="layout__link layout__link--active"
        >Мои данные</router-link
      >
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <div class="user">
        <picture>
          <img :src="user.avatar" :alt="user.name" width="72" height="72" />
        </picture>
        <div class="user__name">
          <span>{{ user.name }}</span>
        </div>
        <p class="user__phone">
          Контактный телефон: <span>{{ user.phone }}</span>
        </p>
      </div>

      <div class="layout__address">
        <div
          class="sheet address-form layout__address"
          v-for="address in addresses"
          :key="address.id"
        >
          <div>
            <div class="address-form__header">
              <b>Адрес №{{ address.id }}</b>
              <div class="address-form__edit">
                <button
                  type="button"
                  class="icon"
                  @click="toggleAddress(address.id)"
                >
                  <span class="visually-hidden">Изменить адрес</span>
                </button>
              </div>
            </div>
            <div v-if="!toggleInfo[address.id]">
              <p>{{ address.name }}</p>
              <small>{{ address.comment }}</small>
            </div>
            <ChangeAddress
              v-else
              :address="address"
              :toggle-address="toggleAddress"
            />
          </div>
        </div>
      </div>
      <div v-show="toggleInfo['new']" class="sheet address-form">
        <ChangeAddress :toggle-address="toggleAddress" />
      </div>
      <div class="layout__button">
        <button
          type="button"
          class="button button--border"
          @click="toggleAddress('new')"
        >
          Добавить новый адрес
        </button>
      </div>
    </div>
  </main>
</template>
<script>
import { mapState, mapActions } from "vuex";
import ChangeAddress from "@/modules/profile/components/ChangeAddress";
export default {
  components: {
    ChangeAddress,
  },

  data() {
    return {
      toggleInfo: {},
    };
  },

  created() {
    this.getAddresses();
  },

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Profile", ["addresses"]),
  },

  methods: {
    toggleAddress(addressId) {
      this.toggleInfo = {
        ...this.toggleInfo,
        [addressId]: !this.toggleInfo[addressId],
      };
    },

    ...mapActions("Profile", ["getAddresses"]),
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/blocks/user.scss";
@import "~@/assets/scss/blocks/address-form.scss";
@import "~@/assets/scss/blocks/icon.scss";
@import "~@/assets/scss/blocks/logo.scss";
</style>
