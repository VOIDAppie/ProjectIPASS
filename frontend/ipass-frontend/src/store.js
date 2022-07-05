import Vue from 'vue'
import Vuex from 'vuex'
import {axiosInstance} from "@/api";

Vue.use(Vuex)

const BASE_URL = 'https://ipass-project-1.herokuapp.com'

export default new Vuex.Store({
    state: {
        products: [],
        transaction: {
            purchases: [],
            timestamp: null,
            totalPrice: 0
        },
        cart: [],
        error: null,
        loading: false,
        isUserLoggedIn: false,
        username: null,
    },
    mutations: {
        setUsername(state, username) {
            state.username = username
        },
        storeProducts(state, products) {
            state.products = products
        },
        setUserLoginState(state, loginState) {
            state.isUserLoggedIn = loginState
        },
        addProductToTransaction(state, purchase) {
            const existsAtIndex = state.transaction.purchases.findIndex(p => p.product.name === purchase.product.name)

            if(existsAtIndex !== -1) {
                state.transaction.purchases[existsAtIndex] = { product: purchase.product, amount: state.transaction.purchases[existsAtIndex].amount + 1 }
            } else {
                state.transaction.purchases.push(purchase)
            }
        },
        removeProductFromTransaction(state, product) {
            const existsAtIndex = state.transaction.purchases.findIndex(p => p.product.name === product.name)

            if(state.transaction.purchases[existsAtIndex].amount > 1) {
                state.transaction.purchases[existsAtIndex] = { product: product, amount: state.transaction.purchases[existsAtIndex].amount - 1 }
            } else {
                state.transaction.purchases.splice(existsAtIndex, 1)
            }
        },
        removeProductCompletelyFromTransaction(state, product) {
            const index = state.transaction.purchases.findIndex(p => p.product.name === product.name)
            state.transaction.purchases.splice(index, 1)
        },
        updateTransactionTotalPrice(state) {
            state.transaction.totalPrice = 0
            state.transaction.purchases.forEach(
                (purchase) => {
                    state.transaction.totalPrice += purchase.product.price * purchase.amount
                }
            )
            state.transaction.totalPrice = (Math.round(state.transaction.totalPrice * 100) / 100).toFixed(2);
        },
        setTransactionTime(state, timestamp) {
            state.transaction.timestamp = timestamp
        },
        setError(state, error) {
            state.error = error;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        clearTransaction(state) {
            state.transaction = {
                purchases: [],
                timestamp: null,
                totalPrice: 0
            }
        }
    },
    actions: {
        getProducts({commit}) {
            commit('setLoading', true)
            axiosInstance.get(`${BASE_URL}/products`)
                .then(response => {
                    commit('storeProducts', response.data);
                    commit('setLoading', false);
                })
                .catch(error => {
                    commit('setError', error);
                    commit('setLoading', false);
                });
        },
        saveTransaction({commit}, transaction) {
            commit('setLoading', true);
            commit('setTransactionTime', Date.now().toString())
            axiosInstance.post('transactions', transaction)
                .then(() => {commit('setLoading', false)})
                .catch(error => {
                    commit('setError', error);
                    commit('setLoading', false);
                });
            commit('clearTransaction');
        },
        clearTransaction({commit}) {
            commit('clearTransaction')
        },
        updatePrice({commit}) {
            commit('updateTransactionTotalPrice')
        },
        addProductToTransaction({commit}, purchase) {
            commit('addProductToTransaction', purchase)
            commit('updateTransactionTotalPrice')
        },
        removeProductFromTransaction({commit}, product) {
            commit('removeProductFromTransaction', product)
            commit('updateTransactionTotalPrice')
        },
        removeProductCompletelyFromTransaction({commit}, product) {
            commit('removeProductCompletelyFromTransaction', product)
            commit('updateTransactionTotalPrice')
        },
        setUserLoginState({commit}, loginState) {
            commit('setUserLoginState', loginState)
        },
        setUsername({commit}, username) {
            commit('setUsername', username)
        }
    }
})