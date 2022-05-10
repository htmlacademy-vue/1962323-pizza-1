import {
    ADD_NEW_ADDRESS,
    GET_ADDRESSES
} from "@/store/mutation-types";
export default {
    namespaced: true,
    state: {
        addresses: [],
    },
    actions: {
        async addNewAddress({commit, rootState}, data) {
            data.userId = rootState.Auth.user.id
            let result = await this.$api.profile.addNewAddress(data)
            console.log("QWE", result)
            commit(ADD_NEW_ADDRESS, result)
        },
        async getAddresses({commit}) {
            let result = await this.$api.profile.getAddresses()
            console.log("QWE11", result)
            commit(GET_ADDRESSES, result)
        }
    },
    mutations: {
        [ADD_NEW_ADDRESS](state, result) {
            state.addresses = [...state.addresses, ...result]
        },
        [GET_ADDRESSES](state, result) {
            state.addresses = [...result]
        }
    },
    getters: {},
};