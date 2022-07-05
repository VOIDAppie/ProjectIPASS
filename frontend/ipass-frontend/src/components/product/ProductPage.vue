<template>
    <div class="container-md product-container">
        <product-tile v-for="product in products" :product="product" :key="product.id"></product-tile>
    </div>
</template>

<script>
import ProductTile from "@/components/product/ProductTile";

export default {
    name: "ProductPage",
    components: {ProductTile},
    computed: {
        products() {
            return [{"id":1,"name":"holyWood","price":2.45,"displayName":"Holy Wood","imgUrl":"https://bep2022.blob.core.windows.net/images/palasanto.jpg"},{"id":2,"name":"spiritualBath","price":1.99,"displayName":"Spiritual Bath","imgUrl":"https://bep2022.blob.core.windows.net/images/7Ghost.jpg"},{"id":3,"name":"smudgeStickSingle","price":2.99,"displayName":"Smudge stick Single","imgUrl":"https://bep2022.blob.core.windows.net/images/smudgeStickSingle.jpg"},{"id":4,"name":"smudgeStickBundle","price":3.65,"displayName":"Smudge stick Bundle","imgUrl":"https://bep2022.blob.core.windows.net/images/smudgeStickBundle.jpg"},{"id":5,"name":"cupping","price":19.99,"displayName":"Cupping","imgUrl":"https://bep2022.blob.core.windows.net/images/cupping.jpg"},{"id":6,"name":"coffeeReading","price":29.99,"displayName":"Coffee Reading","imgUrl":"https://bep2022.blob.core.windows.net/images/coffee.jpg"}]
        }
    }
}
</script>

<style scoped>
.product-container {
    display: flex;
}
</style>