<template>
    <label class="input">
        <slot/>
        <input type="text" :name="name" :placeholder="placeholder" @input="$emit('input', $event.target.value)">
    </label>
</template>
<script>
export default {
    props:{
        name:{
            type: String,
            required: true
        },
        placeholder:{
            type: String,
            default: ""
        }
    }
}
</script>

