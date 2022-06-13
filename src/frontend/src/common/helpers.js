import resources from "@/common/enums/resources";
import {
  AuthApiService,
  PizzaService,
  OrderService,
  ProfileService,
} from "@/services/api.service";

export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.PIZZA]: new PizzaService(),
    [resources.ORDERS]: new OrderService(),
    [resources.PROFILE]: new ProfileService(),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

export const getElemFromStore = (store, type, id) => {
  if (!store[type]) {
    return;
  }
  return store[type].find((elem) => elem.id == id);
};

export const getPizzaPrice = (sauces, dough, ingredients, sizes, pizza) => {
  if (!sauces.length || !dough.length || !ingredients.length || !sizes.length) {
    return 0;
  }
  let totalPrice = 0;
  if (pizza.sauceId) {
    totalPrice += sauces.find((sauce) => sauce.id == pizza.sauceId).price;
  }
  if (pizza.doughId) {
    totalPrice += dough.find((dough) => dough.id == pizza.doughId).price;
  }

  if (pizza.ingredients) {
    let selectedIngredients = pizza.ingredients.filter(
      (ingredient) => ingredient.quantity > 0
    );
    selectedIngredients.forEach((pizzaIngredient) => {
      totalPrice +=
        ingredients.find(
          (ingredient) => ingredient.id == pizzaIngredient.ingredientId
        ).price * pizzaIngredient.quantity;
    });
  }
  if (pizza.sizeId) {
    totalPrice *= sizes.find((size) => size.id == pizza.sizeId).multiplier;
  }
  return totalPrice;
};

export const getPizzaInfo = (product, state) => {
  let info = [];
  if (product.sizeId) {
    let size = getElemFromStore(state, "sizes", product.sizeId);
    if (size) {
      info.push(size.name);
    }
  }
  if (product.doughId) {
    let dough = getElemFromStore(state, "dough", product.doughId);
    if (dough) {
      info.push(dough.description); // todo - Из твердых сортов пшеницы переделать на "на тонком/толстом" тесте
    }
  }
  return info.join(", ");
};

export const getPizzaSauce = (product, state) => {
  let sauce = getElemFromStore(state, "sauces", product.sauceId);
  return sauce ? sauce.name : "без соуса";
};

export const getPizzaIngredients = (product, state) => {
  if (!state.ingredients.length) {
    return "";
  }
  let ingredientsList = "без начинки";
  if (product.ingredients) {
    let ingredients = product.ingredients.filter(
      (ingredient) => ingredient.quantity > 0
    );
    ingredientsList = ingredients
      .map(
        (ingredient) =>
          getElemFromStore(state, "ingredients", ingredient.ingredientId).name
      )
      .join(", ");
  }
  return ingredientsList;
};
