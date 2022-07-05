<template>
    <div>
        <product-page />
        <cart-page v-if="isLoggedIn" />
        <b-alert v-if="!isLoggedIn" v-model="showDismissibleAlert" variant="danger" dismissible show>
            Please log in to use the store.
        </b-alert>
    </div>
</template>

<script>
import ProductPage from "@/components/product/ProductPage";
import CartPage from "@/components/cart/CartPage";

export default {
    name: "AppHome",
    components: {ProductPage, CartPage},
    data() {
        return {
            showDismissibleAlert: true
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.isUserLoggedIn;
        }
    },
    mounted() {
        this.$store.dispatch('getProducts');
    }
}
</script>

<style scoped>

</style>