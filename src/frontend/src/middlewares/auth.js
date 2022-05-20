import { setAuth } from '@/common/helpers';

export const auth = ({ next, store, nextMiddleware }) => {
  if (!store.getters['Auth/isAuthenticated']) {
    const token = store.$jwt.getToken();
    if (token) {
      setAuth(store);
    } else {
      next('/');
    }
  }
  return nextMiddleware();
}

export const isLoggedIn = ({ next, store, nextMiddleware }) => {
  if (store.$jwt.getToken()) {
    next('/');
  }
  return nextMiddleware();
}
