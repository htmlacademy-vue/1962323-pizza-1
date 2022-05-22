import { auth, isLoggedIn } from '@/middlewares';
export default [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index.vue'),
        meta: { layout: 'AppLayoutMain' }
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue'),
        meta: { layout: 'AppLayoutMain' }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: { 
            layout: 'AppLayoutMain',
            middlewares: [auth]  
        }
    },
    {
        path: '/orders',
        name: 'Orders',
        component: () => import('../views/Orders.vue'),
        meta: {
            layout: 'AppLayoutMain', 
            middlewares: [auth] 
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: { 
            layout: 'AppLayoutWithoutHeader',
            middlewares: [isLoggedIn],
            transition: 'none' 
        }
    },
    {
        path: '/success',
        name: 'Popup',
        component: () => import('../views/Popup.vue'),
        meta: { layout: 'AppLayoutWithoutHeader', transition: 'fade'   }
    }
];