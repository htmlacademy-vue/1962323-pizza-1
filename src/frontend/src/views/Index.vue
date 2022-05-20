<template>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <DoughSelector />
          <SizeSelector />
          <IngredientsSelector />
          <PizzaView />
        </div>
      </form>
    </main>
</template>
<script>

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
  }
};
</script>

<style scoped>

</style>
