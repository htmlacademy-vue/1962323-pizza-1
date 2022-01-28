<template>
    <label class="input">
        <span>
             <slot/>
        </span>
        <input type="text" :name="name" :placeholder="placeholder">
    </label>
</template>
<script>
export default {
   props:["name", "placeholder"]
}
</script>

