import Vue from "vue";
import {
    ADD_NEW_ADDRESS,
    DELETE_ADDRESS,
    EDIT_ADDRESS
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
            commit(ADD_NEW_ADDRESS, result)
        },
        async deleteAddresses({commit}, addressId) {
            let result = await this.$api.profile.deleteAddresses(addressId)
            commit(DELETE_ADDRESS, addressId)
        },
        async editAddress({commit, rootState}, data) {
            data.userId = rootState.Auth.user.id
            let result = await this.$api.profile.editAddress(data)
            commit(EDIT_ADDRESS, data)
        }
    },
    mutations: {
        [ADD_NEW_ADDRESS](state, result) {
            state.addresses.push(result)
        },
        [DELETE_ADDRESS](state, addressId) {
            state.addresses = state.addresses.filter(address => address.id != addressId)
        },
        [EDIT_ADDRESS](state, data) {
            let index = state.addresses.findIndex(address => address.id == data.id)
            Vue.set(state.addresses, index, data)
        },
    },
    getters: {},
};