
import resources from '@/common/enums/resources';
import {
  AuthApiService,
  PizzaService,
  OrderService,
  ProfileService
} from '@/services/api.service';
export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.PIZZA]: new PizzaService(),
    [resources.ORDERS]: new OrderService(),
    [resources.PROFILE]: new ProfileService()
  };
};

export const setAuth = store => {
  store.$api.auth.setAuthHeader();
  store.dispatch('Auth/getMe');
};


export const getElemFromStore = (store, type, id) => {
  console.log(store[type])
  return store[type].find(elem => elem.id == id)
};


export const getPizzaPrice = (store, pizza) => {

  let totalPrice = 0
  if(!pizza){
    pizza = store.configuredPizza
  }
  let ingredients =  pizza.ingredients.filter(ingredient => ingredient.quantity > 0)
  if(pizza.sauceId){
    totalPrice += store.sauces.find(sauce => sauce.id == pizza.sauceId).price
  }
  if(pizza.doughId){
    totalPrice += store.dough.find(dough => dough.id == pizza.doughId).price
  }
  if(pizza.ingredients.length > 0){
    ingredients.forEach(pizzaIngredient => {
      totalPrice += store.ingredients.find(ingredient => ingredient.id == pizzaIngredient.ingredientId).price * pizzaIngredient.quantity
    })
  }
  if(pizza.sizeId){
    totalPrice *= store.sizes.find(size => size.id == pizza.sizeId).multiplier
  }
  //todo сделать множитель 2х/3х
  return totalPrice
};


export const getPizzaInfo = (product, state) => {
  //let state = this.$store.state.PizzaConstructor
  let info = []
  if(product.sizeId){
    let size = getElemFromStore(state, "sizes", product.sizeId)
    if(size){
      info.push(size.name)
    }
  }
  if(product.doughId){
    let dough = getElemFromStore(state, "dough", product.doughId)
    if(dough){
      info.push(dough.description)
    }
  }
  return info.join(", ")
}

export const getPizzaSauce = (product, state) => {
  let sauce = getElemFromStore(state, "sauces", product.sauceId)
  return sauce ? sauce.name : "без соуса"
}

export const getPizzaIngredients = (product, state) => {
  let ingredients = product.ingredients.filter(ingredient => ingredient.quantity > 0)
  let ingredientsList = ingredients.map(ingredient => getElemFromStore(state, "ingredients", ingredient.ingredientId).name).join(", ")
  return (ingredientsList ? ingredientsList : "без начинки")
}

export const getMiscInfo = (state, product) => {
  let ingredients = product.ingredients.filter(ingredient => ingredient.quantity > 0)
  let ingredientsList = ingredients.map(ingredient => getElemFromStore(state, "misc", ingredient.ingredientId).name).join(", ")
  return (ingredientsList ? ingredientsList : "без начинки")
}