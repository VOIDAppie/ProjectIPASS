<template>
    <div class="login-container">
        <b-form id="login-form" @submit.prevent="login" class="login-box">
            <b-form-group id="login-form-group" v-if="!isLoggedIn">
                <b-form-input id="username-input" v-model="username" placeholder="username" required></b-form-input>
                <b-form-input id="password-input" type="password" v-model="password" placeholder="password" required></b-form-input>
            </b-form-group>
            <b-alert v-if="isError" show variant="danger" dismissible>{{error}}</b-alert>
            <b-button v-if="!isLoggedIn" variant="success" @click="login" type="submit" :disabled="!isInputValid">Login</b-button>
            <div v-if="isLoggedIn">
                <b-alert show variant="secondary">User {{getUsername}} is logged in.</b-alert>
                <b-button v-if="isLoggedIn" variant="danger" @click="logout">Logout</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
import { login, logout } from "@/api";

export default {
    name: "AppLogin",
    data() {
        return {
            username: null,
            password: null,
            error: null,
        }
    },
    methods: {
        async login() {
            this.clearError()
            await login({ username: this.username, password: this.password}).catch(
                () => this.error = "Error while logging in"
            );
            if(!this.error) {
                await this.$store.dispatch('setUserLoginState', true);
                await this.$store.dispatch('setUsername', this.username);
                this.$router.push("/");
            }
        },
        clearError() {
            this.error = null
        },
        logout() {
            logout();
            this.$store.state.isUserLoggedIn = false;
            this.$store.dispatch('setUserLoginState', false);
            this.$store.dispatch('clearTransaction');
        },
    },
    computed: {
        isInputValid() {
            return this.username !== null && this.password !== null && this.username !== "" && this.password !== "";
        },
        isLoggedIn() {
            return this.$store.state.isUserLoggedIn;
        },
        getUsername() {
            return this.$store.state.username
        },
        isError() {
            return this.error !== null;
        }
    },
    mounted() {
        this.error = null;
    }
}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
}
.login-box {
    width: 30%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
</style>