import { defineStore } from "pinia";
import { api } from "~/api/index.js";
import { ref } from "vue";
import { useCookie } from "#app";

export const useAuthStore = defineStore("auth", () => {
    const authData = ref(null);
    const authCookie = useCookie("auth");

    const signin = async (data) => {
        try {
            const res = await api.post("/auth/signin", data);
            authData.value = res.data;
            saveAuthData();
        } catch (e) {
            console.error(e);
            throw e; // Пробрасываем ошибку для обработки в компонентах
        }
    };

    const signup = async (data) => {
        try {
            const res = await api.post("/auth/signup", data);
            authData.value = res.data;
            saveAuthData();
        } catch (e) {
            console.error(e);
            throw e; // Пробрасываем ошибку для обработки в компонентах
        }
    };

    const signout = () => {
        authData.value = null;
        authCookie.value = null;
    };

    const isAuthenticated = computed(() => !!authData.value);

    const saveAuthData = () => {
        if (authData.value) {
            authCookie.value = btoa(JSON.stringify(authData.value));
        }
    };

    const readAuthData = () => {
        if (authCookie.value) {
            authData.value = JSON.parse(atob(authCookie.value));
        }
    };

    readAuthData();

    return {
        authData,
        isAuthenticated,
        signin,
        signup,
        signout,
    };
});