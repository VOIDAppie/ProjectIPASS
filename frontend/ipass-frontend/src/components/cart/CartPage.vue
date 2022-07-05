<template>
    <div class="container-md cart-container">
        <h2>Cart</h2>
        <cart-tile v-for="purchase in purchases" :amount="purchase.amount" :product="purchase.product" :key="purchase.product.id" />
        <b-button @click="commitTransaction" variant="success" :disabled="!isValidTransaction" style="width: 50%; align-self: center">{{purchaseString}}</b-button>
    </div>
</template>

<script>
import CartTile from "@/components/cart/CartTile";

export default {
    name: "CartPage",
    components: {CartTile},
    methods: {
        commitTransaction() {
            this.$store.dispatch('saveTransaction', this.$store.state.transaction);
        }
    },
    computed: {
        purchaseString() {
            if(this.$store.state.transaction.purchases.length > 0) {
                return "Buy (total price: €" + this.$store.state.transaction.totalPrice + ")"
            } else {
                return "Put some items in the cart"
            }
        },
        purchases() {
            return this.$store.state.transaction.purchases
        },
        totalPrice() {
            return this.$store.state.transaction.totalPrice
        },
        isValidTransaction() {
            return this.$store.state.transaction.purchases.length > 0
        }
    }
}
</script>

<style scoped>
.cart-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>