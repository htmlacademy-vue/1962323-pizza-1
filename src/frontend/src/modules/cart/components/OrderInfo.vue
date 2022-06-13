<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>
        <SelectInput
          name="delivery"
          :options="options"
          v-model="deliveryType"
        />
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <TextInput
          name="phone"
          place-holder="+7 999-999-99-99"
          :value="phone"
          @input="addPhone"
        />
      </label>

      <div class="cart-form__address" v-show="deliveryType != 'takeout'">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <TextInput
              name="street"
              place-holder=""
              :is-disabled="isDisabled"
              :value="address ? address.street : ''"
              @input="handleInfo"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <TextInput
              name="building"
              place-holder=""
              :is-disabled="isDisabled"
              :value="address ? address.building : ''"
              @input="handleInfo"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <TextInput
              name="flat"
              place-holder=""
              :is-disabled="isDisabled"
              :value="address ? address.flat : ''"
              @input="handleInfo"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import TextInput from "@/common/components/TextInput";
import SelectInput from "@/common/components/SelectInput";
import deliveryOptions from "@/common/enums/deliveryOptions";

export default {
  components: {
    TextInput,
    SelectInput,
  },

  data() {
    return {
      deliveryType: "new_address",
    };
  },

  watch: {
    deliveryType(newValue) {
      this.handleDeliveryType(newValue);
    },
  },

  computed: {
    isDisabled() {
      if (
        this.deliveryType != "new_address" &&
        this.deliveryType != "takeout"
      ) {
        return true;
      }
      return false;
    },

    options() {
      let options = [...deliveryOptions];
      if (this.isAuthenticated) {
        let addresses = this.$store.state.Profile.addresses;
        addresses = addresses.map((address) => ({
          value: address.id,
          name: address.name,
        }));
        options = [...options, ...addresses];
      }
      return options;
    },

    ...mapGetters("Auth", ["isAuthenticated"]),
    ...mapGetters("Order", ["additionalProducts"]),
    ...mapState("Order", ["address", "phone"]),
  },
  methods: {
    handleInfo(value, name) {
      if (name == "phone") {
        this.addPhone(value);
      } else {
        this.setAddressValue({ value, name });
      }
    },

    handleDeliveryType(value) {
      if (value == "takeout" || value == "new_address") {
        this.setAddressValue(null);
      } else {
        this.setAddressValue({ value, name: "id" });
        this.setExistedAddress(value);
      }
    },

    ...mapActions("Order", [
      "setAddressValue",
      "setExistedAddress",
      "addPhone",
    ]),
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/blocks/cart-form.scss";
</style>
