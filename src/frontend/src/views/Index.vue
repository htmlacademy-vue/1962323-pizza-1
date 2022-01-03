<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img src="img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>
              <div class="sheet__content dough">
                <label :class="`dough__input dough__input--${get_class(classes.doughs, dough.id)}`" v-for="dough of fulldata.doughs" :key="dough.id">
                  <input type="radio" name="dought" :value="dough.id" class="visually-hidden">
                  <b>{{dough.name}}</b>
                  <span>{{dough.description}}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>
              <div class="sheet__content diameter"> 
                <label :class="`diameter__input diameter__input--${get_class(classes.sizes, size.id)}`" v-for="size of fulldata.sizes" :key="size.id">
                  <input type="radio" name="diameter" :value="size.id" class="visually-hidden">
                  <span>{{size.name}}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
              <div class="sheet__content ingredients">
                <div class="ingredients__sauce">
                  <p>Основной соус:</p>
                  <label class="radio ingredients__input" v-for="sauce of fulldata.sauces" :key="sauce.id">
                    <input type="radio" name="sauce" :value="sauce.id">
                    <span>{{sauce.name}}</span>
                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>
                  <ul class="ingredients__list">
                    <li class="ingredients__item" v-for="ingrigient of fulldata.ingredients" :key="ingrigient.id">
                      <span :class="`filling filling--${get_class(classes.ingredients, ingrigient.id)}`">{{ingrigient.name}}</span>
                      <div class="counter counter--orange ingredients__counter">
                        <button type="button" class="counter__button counter__button--minus" disabled>
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input type="text" :name="`counter-${ingrigient.id}`" class="counter__input" value="0">
                        <button type="button" class="counter__button counter__button--plus">
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input type="text" name="pizza_name" placeholder="Введите название пиццы">
            </label>
            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>
            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import fulldata from '@/static/pizza.json'
export default {
  data(){
    return {
      fulldata:{
        doughs: fulldata.dough,
        ingredients: fulldata.ingredients,
        sauces: fulldata.sauces,
        sizes: fulldata.sizes,
      },
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
        doughs: [
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
    get_class(classes, id) {
      return classes.find(elem=>elem.id == id).code;
    }
  }
};
</script>

<style scoped>

</style>
