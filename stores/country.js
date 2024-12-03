import {defineStore} from "pinia";
import {api} from "~/api/index.js";

export const useCountryStore = defineStore('country', () => {
    const countries = ref([]);

    const filteredCountries = async () => {
        const res = await api.get("/countries");
        countries.value = res.data.countries;
    }
    filteredCountries();
    return {
        countries,
    }
});