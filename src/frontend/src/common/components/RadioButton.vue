<template>
    <label :class="labelClass">
        <input type="radio" :name="name" :value="value" :class="inputClass" @input="$emit('input', $event.target.value)"/>
        <slot/>
    </label>
</template>
<script>
export default {
   props:{
        name:{
            type:String,
            required:true
        },
        inputClass:{
            type:String,
            default: ""
        },
        labelClass:{
            type:String,
            default: ""
        },
        value:{
            type: [String, Number],
            required: true
        }
   }
   
}
</script>

