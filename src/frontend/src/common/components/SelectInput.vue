<template>
    <label class="input">
        <slot/>
          <select :name="name" class="select" @change="$emit('input', $event.target.value, name)">
            <option :value="option.value" v-for="option of options" :key="option.value" :selected="value == option.value">{{option.name}}</option>
        </select>
    </label>
</template>
<script>
export default {
    props: {

        value:{
            type: String,
            default: ""
        },

        options:{
            type: Array,
            default: () => {}
        },
        
        name:{
            type: String,
            required: true
        }
    }
}
</script>

