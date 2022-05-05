<template>
    <label class="input">
        <slot/>
        <input type="text" :name="name" :placeholder="placeHolder" @change="$emit('input', $event.target.value, name)" :value="value">
    </label>
</template>
<script>
export default {
    props:{
        value:{
            type: String,
            default: ""
        },
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

