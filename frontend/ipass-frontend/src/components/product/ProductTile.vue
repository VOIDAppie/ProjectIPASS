<template>
    <div class="grid-container">
        <b-card
            :title="product.displayName"
            img-top
            style="max-width: 20rem;"
            class="mb-2"
        >
            <b-card-text style="height: 100px">
                <img class="product-card-image" :src="product.imgUrl">
            </b-card-text>
            <b-button :id="product.name + '-tooltip'" @click="addToTransaction" variant="primary" :disabled="!isLoggedIn">€{{product.price}}</b-button>
            <b-tooltip v-if="!isLoggedIn" :target="product.name + '-tooltip'" triggers="hover">
                Please log in to access the store!
            </b-tooltip>
        </b-card>
    </div>
</template>

<script>
import {getAccessToken} from "axios-jwt";

export default {
    name: "ProductTile",
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        addToTransaction() {
            this.$store.dispatch('addProductToTransaction', { product: this.product, amount: 1 });
        },
    },
    computed: {
        isLoggedIn() {
            return getAccessToken() !== null && getAccessToken() !== undefined
        }
    },
}
</script>

<style scoped>
.grid-container {
    display: grid;
    gap: 10px;
    padding: 10px;
}

.product-card-image {
    height: 100%;
    width: 100%;
    object-fit: contain;
}
</style>