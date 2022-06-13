<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <RadioButton
          v-for="size of sizes"
          :label-class="`diameter__input diameter__input--${size.class}`"
          input-class="visually-hidden"
          name="diameter"
          :key="size.id"
          :value="size.id"
          :selected-value="selectedValue"
          @input="setSize"
        >
          <span>{{ size.name }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>
<script>
import RadioButton from "@/common/components/RadioButton";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    RadioButton,
  },

  computed: {
    selectedValue() {
      return this.configuredPizza.sizeId ? this.configuredPizza.sizeId : null;
    },

    ...mapState("PizzaConstructor", ["sizes", "configuredPizza"]),
  },

  methods: {
    ...mapActions("PizzaConstructor", ["setSize"]),
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/diameter.scss";
</style>
