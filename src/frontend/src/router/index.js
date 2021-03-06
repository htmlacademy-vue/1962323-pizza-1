import Vue from "vue";
import Router from "vue-router";
import routes from "@/router/routes";
import { middlewarePipeline } from "@/middlewares";
import store from "@/store";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const middlewares = to.meta.middlewares;
  if (!middlewares?.length) {
    return next();
  }

  const context = { to, from, next, store };
  const firstMiddlewareIndex = 0;
  const nextMiddlewareIndex = 1;
  return middlewares[firstMiddlewareIndex]({
    ...context,
    nextMiddleware: middlewarePipeline(
      context,
      middlewares,
      nextMiddlewareIndex
    ),
  });
});

export default router;
