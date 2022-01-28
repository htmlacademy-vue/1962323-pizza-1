<template>
    <label :class="label_class">
        <input type="radio" :name="name" :value="value.id" :class="input_class" />
        <slot/>
    </label>
</template>
<script>
export default {
   props:["name", "value", "input_class", "label_class"]
}
</script>

