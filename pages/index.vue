<script setup lang="ts">


import {useFilmStore} from "~/stores/film";


const countryStore = useCountryStore();
const filmStore = useFilmStore();
const categoryStore = useCategoryStore();
const category = ref(null);
const country = ref(null);
const sort = ref('name')
const filter = () => {
  filmStore.addCategoryToParams(category.value);
  filmStore.addCountryToParams(category.value);
  filmStore.addSortToParams(sort.value);
  filmStore.fetchFilms();
}
const resetFilter = () => {
  category.value = null;
  country.value = null;
  sort.value = 'name';
  filter();
}
</script>

<template>
  <div class="row">
    <div class="col-md-4">
      <select v-model="category" @change="filter" class="form-select" aria-label="Default select example">
        <option
            v-for="category in categoryStore.categories"
            :key="category.id"
            :value="category.id">{{ category.name }} ({{ category.filmCount }})
        </option>
      </select>
    </div>
    <div class="col-md-4">
      <select v-model="country" @change="filter" class="form-select" aria-label="Default select example">
        <option
            v-for="country in countryStore.countries"
            :key="country.id"
            :value="country.id">{{ country.name }} </option>
      </select>
    </div>
    <div class="col-md-2">
      <select v-model="sort" @change="filter" class="form-select" aria-label="Default select example">
        <option selected>Open this select menu</option>
        <option value="1">Name</option>
        <option value="2">Year</option>
        <option value="3">Rating</option>
      </select>
    </div>
    <div class="col-md-2">
      <button @click="resetFilter" class="btn btn-light">Reseut</button>
    </div>
  </div>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col" v-for="film in filmStore.films" :key="film.id" >
      <div class="card">
        <img v-if="film.link_img" :src="film.link_img" class="card-img-top" alt="film.link_img">
        <img v-else src="https://static.hdrezka.ac/i/2020/11/16/zbf7212111c65jj17c87y.jpeg" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">{{film.name}}</h5>
          <p class="card-text">{{ film.ratingAvg }}</p>
          <p class="card-text">{{ film.duration }} min.</p>
          <p class="card-text">
            <template v-for="category in film.categories" :key = "category.id">{{category.name}}
              {{category.name}}
            </template>
          </p>
          <button type="button" class="btn btn-info">Info</button>

        </div>
      </div>
    </div>
  </div>

</template>