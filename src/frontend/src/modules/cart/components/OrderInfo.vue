<template>
<div class="cart__form">
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>
      <SelectInput 
        name = "delivery"
        :options = "options"
        :value = "address.delivery"
        @input = "handleInfo"
      />
    </label>

    <label class="input input--big-label">
      <span>Контактный телефон:</span>
        <TextInput
          name="phone"
          place-holder="+7 999-999-99-99"
          :value = "phone"
          @input = "handleInfo"
        />
    </label>

    <div class="cart-form__address">
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <label class="input">
          <span>Улица*</span>
           <TextInput
            name="street"
            place-holder=""
            :value = "address.street"
            @input = "handleInfo"
           />
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Дом*</span>
            <TextInput
            name="building"
            place-holder=""
            :value = "address.building"
            @input = "handleInfo"
           />
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Квартира</span>
            <TextInput
              name="flat"
              place-holder=""
              :value = "address.flat"
              @input = "handleInfo"
            />
        </label>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import { mapState, mapGetters, mapActions } from "vuex";
import TextInput from '@/common/components/TextInput'
import SelectInput from '@/common/components/SelectInput'

export default {
    components:{
      TextInput,
      SelectInput
    },
    data(){
      return {
        options:[
          {value: "1", name: "Заберу сам"},
          {value: "2", name: "Новый адрес"},
          {value: "3", name: "Дом"}
        ]
      }
    },
    computed:{
        ...mapGetters("Order", ["additionalProducts"]),
        ...mapState("Order", ["address", "phone"])
    },
    methods:{
      ...mapActions("Order", ["addAddress"]),
      handleInfo(value, name){
          this.addAddress({value, name})
      }
    }
}
</script>

