<template>
    <label class="input">
        <slot/>
        <input type="text" :name="name" :placeholder="placeHolder" @input="$emit('input', $event.target.value)">
    </label>
</template>
<script>
export default {
    props:{
        name:{
            type: String,
            required: true
        },
        placeHolder:{
            type: String,
            default: ""
        }
    }
}
</script>

