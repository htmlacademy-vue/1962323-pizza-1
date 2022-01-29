<template>
    <label class="input">
        <slot/>
        <input type="text" :name="name" :placeholder="placeholder">
    </label>
</template>
<script>
export default {
   props:["name", "placeholder"]
}
</script>

