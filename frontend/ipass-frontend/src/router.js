import Vue from "vue";
import VueRouter from "vue-router";
import AppHome from "@/components/AppHome";
import AppLogin from "@/components/AppLogin";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: AppHome },
    { path: '/login', component: AppLogin },
    { path: '*', component: AppHome}
]

export default new VueRouter({mode: 'history', routes})