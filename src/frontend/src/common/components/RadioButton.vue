<template>
    <label :class="label_class">
        <input type="radio" :name="name" :value="value" :class="input_class" @input="$emit('input', $event.target.value)"/>
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
        input_class:{
            type:String,
            default: ""
        },
        label_class:{
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

