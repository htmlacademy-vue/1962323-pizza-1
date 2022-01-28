<template>
    <div class="content__diameter">
        <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>
            <div class="sheet__content diameter"> 
                <RadioButton  
                    v-for="size of fulldata.sizes" 
                    :label_class="`diameter__input diameter__input--${get_class(classes.sizes, size.id)}`" 
                    :input_class="'visually-hidden'"
                    :name="'diameter'" 
                    :key="size.id" 
                    :value="size" 
                    >
                    <span>{{size.name}}</span>
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
    props:["fulldata", "classes", "get_class"]
}
</script>

