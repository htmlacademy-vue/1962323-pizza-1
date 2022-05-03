<template>
    <div class="content__dough" >
        <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>
            <div class="sheet__content dough">
                <RadioButton  
                    v-for="dough of doughs" 
                    :label-class="`dough__input dough__input--${dough.class}`" 
                    input-class="visually-hidden"
                    name="dough" 
                    :key="dough.id"
                    :value="dough.id"
                    @input="setDough"
                    :selectedValue="configuredPizza.dough ? configuredPizza.dough.id : null"
                    >
                        <b>{{dough.name}}</b>
                        <span>{{dough.description}}</span>
                </RadioButton>
            </div>
        </div>
    </div>
</template>
<script>
import RadioButton from '@/common/components/RadioButton'
import { mapMutations, mapState, mapActions } from "vuex";
export default {
    components:{
        RadioButton
    },
    methods:{
         ...mapActions("PizzaConstructor", ["setDough"])
    },
    computed:{
        ...mapState("PizzaConstructor", {doughs:"dough", configuredPizza: "configuredPizza"})
    }
 
}
</script>

