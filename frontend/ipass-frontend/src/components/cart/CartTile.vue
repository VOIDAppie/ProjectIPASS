<template>
    <div>
        <div class="cart-tile-container">
            <b-card
                body-class="cart-card"
                class="card-top-class"
            >
                <b-card-header class="cart-card-header">{{product.displayName}}</b-card-header>
                <div class="card-main">
                    <b-card-text class="card-image-container">
                        <img class="card-image" :src="product.imgUrl">
                    </b-card-text>
                    <b-card-text class="card-buttons">
                        <b-button @click="addToAmount" variant="success">+</b-button>
                        <b-button variant="info" disabled>{{amount}}</b-button>
                        <b-button @click="removeFromAmount" variant="warning">-</b-button>
                        <b-button @click="removeProduct" variant="danger">Remove</b-button>
                    </b-card-text>
                </div>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "CartTile",
    props: {
        product: {
            type: Object,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    },
     methods: {
         addToAmount() {
             this.$store.dispatch('addProductToTransaction', { product: this.product, amount: 1 });
         },
         removeFromAmount() {
             this.$store.dispatch('removeProductFromTransaction', this.product);
         },
         removeProduct() {
             this.$store.dispatch('removeProductCompletelyFromTransaction', this.product);
         }
     }
}
</script>

<style scoped>
.cart-tile-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
}
.card-top-class {
    display: flex;
    justify-content: center;
    width: 50%;
    flex-direction: row;
}
.cart-card-header {
    border: none;
    background-color: white;
    font-weight: bold;
    padding-top: 0;
}
.card-main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 50px;
}
.cart-card {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.card-buttons {
    display: flex;
    flex-direction: row;
}
.card-image-container {
    width: 15%;
    margin: 0;
}
.card-image {
    height: 100%;
    width: 100%;
    /*object-fit: contain;*/
}
</style>