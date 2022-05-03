<template>
  <div
    :draggable="draggable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD, MOVE } from '@/common/constants';
import { mapState } from "vuex";
export default {
  name: 'AppDrag',
  props: {
    transferData: {
      type: Object,
      required: true
    }
  },

     
  computed: {
       ...mapState("PizzaConstructor", ["ingredientsCounter"]),
    draggable() {
      if(!this.transferData.count || this.transferData.count < this.ingredientsCounter.max){
         return true
      }
     return false
    }
  },

  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = MOVE;
      dataTransfer.dropEffect = MOVE;
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.transferData)
      );
    }
  }
};
</script>
