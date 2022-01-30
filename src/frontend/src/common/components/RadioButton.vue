<template>
    <label :class="label_class">
        <input type="radio" :name="name" :value="value" :class="input_class" @input="$emit('input', $event.target.value)"/>
        <slot/>
    </label>
</template>
<script>
export default {
   props:["name", "input_class", "label_class", "value"],
   
}
</script>

