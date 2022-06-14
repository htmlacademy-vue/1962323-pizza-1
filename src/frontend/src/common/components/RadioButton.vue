<template>
  <label :class="labelClass">
    <input
      type="radio"
      :name="name"
      :value="value"
      :class="inputClass"
      @change="$emit('input', $event.target.value)"
      :checked="selectedValue == value"
    />
    <slot />
  </label>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },

    inputClass: {
      type: String,
      default: "",
    },

    labelClass: {
      type: String,
      default: "",
    },

    selectedValue: {
      type: [String, Number],
      default: "",
    },

    value: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/radio.scss";
</style>
