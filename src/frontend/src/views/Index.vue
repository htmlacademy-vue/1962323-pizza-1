<template>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <DoughSelector 
            :fulldata="fulldata" 
            :get_class="getClass"
            @input="DoughHandler" 
          />
          <SizeSelector 
            :fulldata="fulldata" 
            :get_class="getClass" 
            @input="SizeHandler"
          />
          <IngredientsSelector 
            :fulldata="fulldata" 
            :get_class="getClass"
            @SouceHandler="SouceHandler"
            @IngredientsCounterHandler="IngredientsCounterHandler"
          />
          <PizzaView 
            @input="TextHandler"
          />
         
        </div>
      </form>
    </main>
</template>

<script>

import fulldata from '@/static/pizza.json'
import DoughSelector from '@/modules/builder/components/BuilderDoughSelector'
import IngredientsSelector from '@/modules/builder/components/BuilderIngredientsSelector'
import SizeSelector from '@/modules/builder/components/BuilderSizeSelector'
import PizzaView from '@/modules/builder/components/BuilderPizzaView'

export default {
  components:{
    DoughSelector,
    IngredientsSelector,
    SizeSelector,
    PizzaView
  },
  data(){
    return {
      fulldata,
      classes:{
        ingredients: [
          { "id": 1, code:"mushrooms"},
          { "id": 2, code:"cheddar"},
          { "id": 3, code:"salami"},
          { "id": 4, code:"ham"},
          { "id": 5, code:"ananas"},
          { "id": 6, code:"bacon"},
          { "id": 7, code:"onion"},
          { "id": 8, code:"chile"},
          { "id": 9, code:"jalapeno"},
          { "id": 10, code:"olives"},
          { "id": 11, code:"tomatoes"},
          { "id": 12, code:"salmon"},
          { "id": 13, code:"mozzarella"},
          { "id": 14, code:"parmesan"},
          { "id": 15, code:"blue_cheese"}
        ],
        dough: [
          { "id": 1, code:"light"},
          { "id": 2, code:"large"},
        ],
        sizes:[
          { "id": 1, code:"small"},
          { "id": 2, code:"normal"},
          { "id": 3, code:"big"},
        ]
      }
    }
  },
  methods:{
    getClass(class_key, id) {
      return this.classes[class_key].find(elem=>elem.id == id).code;
    },
    DoughHandler(value){
      console.log(value)
    },
    SizeHandler(value){
      console.log(value)
    },
    SouceHandler(value){
      console.log(value)
    },
    TextHandler(value){
      console.log(value)
    },
    IngredientsCounterHandler(value, id){
       console.log("value - ", value)
       console.log("counter_name - ", id)
    }
  }
};
</script>

<style scoped>

</style>
