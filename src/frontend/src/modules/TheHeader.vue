<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart"> {{ totalPrice }} ₽ </router-link>
    </div>
    <div class="header__user">
      <router-link v-if="!isAuthenticated" class="header__login" to="/login">
        <span>Войти</span>
      </router-link>

      <router-link v-if="isAuthenticated" to="/profile">
        <picture>
          <img :src="user.avatar" :alt="user.name" width="32" height="32" />
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <a
        v-if="isAuthenticated"
        href="#"
        class="header__logout"
        @click="$logout"
      >
        <span>Выйти</span>
      </a>
    </div>
  </header>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { logout } from "@/common/mixins";
export default {
  mixins: [logout],

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Auth", ["isAuthenticated"]),
    ...mapGetters("Order", ["totalPrice"]),
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/layout/header.scss";
</style>
