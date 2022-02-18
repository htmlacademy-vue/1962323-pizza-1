<template>
    <div class="content__dough" >
        <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>
            <div class="sheet__content dough">
                <RadioButton  
                    v-for="dough of doughs" 
                    :label-class="`dough__input dough__input--${dough.class}`" 
                    input-class="visually-hidden"
                    name="dought" 
                    :key="dough.id"
                    :value="dough.id"
                    @input="handler"
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
export default {
    components:{
        RadioButton
    },
    props:{
        doughs:{
            type: Array,
            required: true
        }
    },
    methods:{
        handler(value){
            this.$emit("DoughHandler", value)
        }
    }
}
</script>

