import {
    SET_ORDERS,
    DELETE_ORDER
} from "@/store/mutation-types";
import {
    getPizzaPrice
} from '@/common/helpers';
export default {
    namespaced: true,
    state: {
        orders: [],
    },
    actions: {
        async getOrders({commit}) {
            let orders = await this.$api.orders.getOrders()
            commit(SET_ORDERS, orders)
        },
        async deleteOrder({commit}, orderId){
            await this.$api.orders.deleteOrder(orderId)
            commit(DELETE_ORDER, orderId)
        }
    },
    mutations: {
        [SET_ORDERS](state, orders) {
            state.orders = [...orders]
        },
        [DELETE_ORDER](state, orderId){
            state.orders = state.orders.filter(order => order.id != orderId)
        }
    },
    getters: {
        ordersPrice(state, getters, rootState) {
            let editedOrders = state.orders.map(order => {
                let totalPrice = 0
                let orderMisc = []
                let orderPizzas = []
               
                if (order.orderMisc) {
                    orderMisc = order.orderMisc.map(misc => {
                        let miscCart = rootState.Order.cart.find(product => product.id == misc.miscId)
                        if (miscCart) {
                            totalPrice += (miscCart.price * misc.quantity)
                            return {...miscCart, ...misc}
                        }
                        return misc
                    })
                }
                
                if (order.orderPizzas) {
                    orderPizzas = order.orderPizzas.map(pizza => {
                        let price = getPizzaPrice(rootState.PizzaConstructor, pizza)
                        totalPrice += (price * pizza.quantity)   
                        return {...pizza, price, productType: "pizza"}
                    })
                }
               
                order.orderMisc = orderMisc 
                order.orderPizzas = orderPizzas 
                order.totalPrice = totalPrice
                return order
            })
            return editedOrders
        }
    },
};