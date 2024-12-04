<script setup lang='ts'>
import { ref } from "vue";
import { useFilmStore } from "~/stores/film";
import {useCategoryStore} from "~/stores/category";

const filmStore = useFilmStore();
const countryStore = useCountryStore();
const categoryStore = useCategoryStore();
const category = ref(null);
const country = ref(null);
const sort = ref('name');
const filter = () => {
  filmStore.addSortToParams(sort.value);
  filmStore.addCountryToParams(country.value);
  filmStore.addCategoryToParams(category.value);
  filmStore.fetchFilms();
}

const resetFilter = () => {
  category.value = null;
  country.value = null;
  sort.value = 'name';
  filter();
}

const goto = (page: number) => {
  page = (page < 1) ? 1 : page;
  page = (page > filmStore.totalPages) ? filmStore.totalPages : page;
  filmStore.currentPage = page;
  filmStore.fetchFilms();
}

import { useRouter } from  "vue-router";
const router = useRouter();

const navigateTo = (filmId: string) => {
  router.push({ path: '/movieView', query: { id: filmId } });
};
</script>

<template>
  <div class="mt-3 row">

    <div class="col-md-4">
      <select v-model="category" @change="filter" class="form-select" aria-label="Default select example">
        <option :value="null" selected>Select genge</option>
        <option
            v-for="category in categoryStore.categories"
            :key="category.id"
            :value="category.id">{{ category.name }} ({{ category.filmCount }})</option>
      </select>
    </div>

    <div class="col-md-4">
      <select v-model="country" @change="filter" class="form-select" aria-label="Default select example">
        <option :value="null" selected>Select country</option>
        <option
            v-for="country in countryStore.countries"
            :key="country.id"
            :value="country.id"
        >{{ country.name }}</option>
      </select>
    </div>
    <div class="col-md-2">
      <select v-model="sort" @change="filter" class="form-select" aria-label="Default select example">
        <option selected>Select genge</option>
        <option value="Name">Name</option>
        <option value="Year">Year</option>
        <option value="Rating">Rating</option>
      </select>
    </div>

    <div class="col-md-2">
      <button @click="resetFilter" class="btn outline-warning">Reset</button>
    </div>
    <div  class="row row-cols-1 row-cols-md-3 g-4">

      <div class="col" v-for="film in filmStore.films" :key="film.id" >
        <div class="card">
          <img v-if="film.link_img" :src="film.link_img" class="card-img-top" alt="film.link_img">
          <img v-else src="https://static.hdrezka.ac/i/2024/8/11/va994a508fc6caz69c16g.png" class="card-img-top" alt="film.link_img">
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
  </div>
  <div class="justify-content-center">

    <div v-if="filmStore.isLoading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <nav v-if="!filmStore.isLoading" class="d-flex justify-content-center my-5" aria-label="Page navigation example">
    <ul class="pagination">
      <li
          :class="{'disabled' : filmStore.currentPage === 1} "
          class="page-item"
      >
        <a
            @click.prevent = "goto(filmStore.currentPage -1)"
            class="page-link"
            href="#">Previous</a>
      </li>
      <li
          v-for="page in filmStore.totalPages"
          :key="page.id"
          class="page-item"
          :class="{'active' : page === filmStore.currentPage}"
      >
        <a @click.prevent="goto(page)"
           class="page-link"
           href="#">{{page}}</a></li>
      <li
          :class="{'disabled' : filmStore.currentPage === 10}"
          class="page-item">
        <a
            @click.prevent = "goto(filmStore.currentPage + 1)"
            class="page-link"
            href="#">Next</a></li>
    </ul>
  </nav>
</template>


