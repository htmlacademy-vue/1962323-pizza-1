import {
    SET_ORDERS,
    DELETE_ORDER
} from "@/store/mutation-types";
import {
    getPizzaInfo,
    getPizzaSauce,
    getPizzaIngredients,
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
            //todo брать misc не из cart
            let editedOrders = state.orders.map(order => {
                let totalPrice = 0
                if (order.orderMisc) {
                    order.orderMisc = order.orderMisc.map(misc => {
                        let miscCart = rootState.Order.cart.find(product => product.id == misc.miscId)
                        if (miscCart) {
                            totalPrice += (miscCart.price * misc.quantity)
                            return {...miscCart, ...misc}
                        }
                        return misc
                    })
                }
                if (order.orderPizzas) {
                    order.orderPizzas = order.orderPizzas.map(pizza => {
                        let price = getPizzaPrice(rootState.PizzaConstructor, pizza)
                        totalPrice += (price * pizza.quantity)   
                        return {...pizza, price, productType: "pizza"}
                    })
                }
                order.totalPrice = totalPrice
                return order
            })
            console.log("editedOrders", editedOrders)
            return editedOrders
        }
    },
};