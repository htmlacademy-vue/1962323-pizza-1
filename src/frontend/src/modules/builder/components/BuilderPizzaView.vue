<template>
    <div class="content__pizza">
        <TextInput
            :name="'pizza_name'"
            :placeholder="'Введите название пиццы'"
            @input="TextHandler"
        />
        <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
            <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
            </div>
            </div>
        </div>
        <div class="content__result">
            <p>Итого: <BuilderPriceCounter /></p>
            <button type="button" class="button" disabled>Готовьте!</button>
        </div>
    </div>
</template>

<script>
import BuilderPriceCounter from '@/modules/builder/components/BuilderPriceCounter'
import TextInput from '@/common/components/TextInput'
export default {
    props:["TextHandler"],
    components:{
        BuilderPriceCounter,
        TextInput
    },
}
</script>

