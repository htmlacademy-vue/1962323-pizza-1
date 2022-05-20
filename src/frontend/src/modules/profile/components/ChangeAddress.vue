<template>
    <div class="layout__address">
        <form action="test.html" method="post" class="address-form address-form--opened">
          <div class="address-form__wrapper">
            <div class="address-form__input">
              <label class="input">
                <span>Название адреса*</span>
                <input type="text" name="addr-name" v-model="addressForm.name" placeholder="Введите название адреса" required>
              </label>
            </div>
            <div class="address-form__input address-form__input--size--normal">
              <label class="input">
                <span>Улица*</span>
                <input type="text" name="addr-street" v-model="addressForm.street" placeholder="Введите название улицы" required>
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Дом*</span>
                <input type="text" name="addr-house" v-model="addressForm.building" placeholder="Введите номер дома" required>
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Квартира</span>
                <input type="text" name="addr-apartment"  v-model="addressForm.flat" placeholder="Введите № квартиры">
              </label>
            </div>
            <div class="address-form__input">
              <label class="input">
                <span>Комментарий</span>
                <input type="text" name="addr-comment" v-model="addressForm.comment" placeholder="Введите комментарий">
              </label>
            </div>
          </div>
          <div class="address-form__buttons">
            <button v-show="address" type="button" class="button button--transparent" @click="deleteAddresses(address.id)">Удалить</button>
            <button type="button" class="button" @click="changeAddress">Сохранить</button>
          </div>
        </form>
      </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    props: {
        address:{
           type: Object,
           required: false
        },

        toggleAddress:{
            type: Function,
            required: false
        }
    },
    created(){
        if(this.address){
            this.fillingForm()
        }
    },
    data(){
      return {
        addressForm:{
            name: "",
            street: "",
            building: "",
            flat: "",
            comment: ""
        }
      }
    },
    computed:{
        ...mapState("Profile", ["addresses"])
    },
    methods:{
        changeAddress(){
            if(this.address){
                this.toggleAddress(this.address.id)
                this.editAddress(this.addressForm)
            }else{
                this.toggleAddress("new")
                this.addNewAddress(this.addressForm)
            }
        },
        fillingForm(){
            this.addressForm.id = this.address.id
            this.addressForm.name = this.address.name
            this.addressForm.street = this.address.street
            this.addressForm.building = this.address.building
            this.addressForm.flat = this.address.flat
            this.addressForm.comment = this.address.comment
        },
        ...mapActions("Profile", ["addNewAddress", "deleteAddresses", "editAddress"])
    }
}
</script>

