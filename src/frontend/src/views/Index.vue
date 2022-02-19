<template>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <DoughSelector 
            :doughs="dough" 
            @DoughHandler="DoughHandler" 
          />
          <SizeSelector 
            :sizes="sizes" 
            @SizeHandler="SizeHandler"
          />
          <IngredientsSelector 
            :ingredients="ingredients"
            :sauces="sauces"
            :ingredients-counter="ingredientsCounter"
            @SouceHandler="SouceHandler"
            @IngredientsCounterHandler="IngredientsCounterHandler"
          />
          <PizzaView 
            :total-prise="totalPrice"
            :ingredients-counter="ingredientsCounter"
            :ingredients="ingredients"
            :selected-dough="selectedDough"
            :selected-sauce="selectedSauce"
            @TextHandler="TextHandler"
            @IngredientsCounterHandler="IngredientsCounterHandler"
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
      priseData: {},
      priseMultiplier: 1,
      selectedDough: "big",
      selectedSauce: "creamy",
      ingredientsCounter:{
          min: 0,
          max: 3
      },
      classes:{
        ingredients: {
          1: "mushrooms",
          2: "cheddar",
          3: "salami",
          4: "ham",
          5: "ananas",
          6: "bacon",
          7: "onion",
          8: "chile",
          9: "jalapeno",
          10: "olives",
          11: "tomatoes",
          12: "salmon",
          13: "mozzarella",
          14: "parmesan",
          15: "blue_cheese"
        },
        dough: {
          1: "light",
          2: "large",
        },
        sizes:{
           1: "small",
           2: "normal",
           3: "big",
        },
        sauces:{
          1: "tomato",
          2: "creamy"
        }
      }
    }
  },

  methods:{
    DoughHandler(id){
      let elem = this.dough.find(elem => elem.id == id)
      this.selectedDough = elem.class == "large" ? "big" : "small"
      this.$set(this.priseData, 'dough', elem.price)
    },
    SouceHandler(id){
      let elem = this.sauces.find(elem => elem.id == id)
      this.selectedSauce = elem.class
      this.$set(this.priseData, 'sauces', elem.price)
    },
    IngredientsCounterHandler(count, id){
      this.setCountToIngredient(count, id)
      this.$set(this.priseData, `ingridient_${id}`,  this.ingredients.find(elem => elem.id == id).price * count)
    },
    setCountToIngredient(count, id){
        let ingredient = this.ingredients.find(elem => elem.id == id) 
        let index = this.ingredients.findIndex(element => element.id == ingredient.id)
        this.$set( this.ingredients, index, {...ingredient, count})
    },
    SizeHandler(id){
      this.priseMultiplier = this.sizes.find(elem => elem.id == id).multiplier
    },
    addClassToElems(type){
        this.fulldata[type].forEach((elem, index) => {
          this.$set(this.fulldata[type], index, {...elem, class: this.classes[type][elem.id]})
        });  
        return this.fulldata[type]
    },
    TextHandler(id){
        console.log(id)
    },
  },
  computed:{
    totalPrice(){
      return Object.values(this.priseData).reduce((current, key) => current + key, 0) * this.priseMultiplier;
    },
    sizes(){
      return this.addClassToElems("sizes")
    },
    dough(){
       return this.addClassToElems("dough")
    },
    ingredients(){
       return this.addClassToElems("ingredients")
    },
    sauces(){
      return this.addClassToElems("sauces")
    }
  }
};
</script>

<style scoped>

</style>
