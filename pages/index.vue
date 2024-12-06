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
  router.push({ path: `/film/${filmId}` });
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
        <option value="name">Name</option>
        <option value="year">Year</option>
        <option value="rating">Rating</option>
      </select>
    </div>

    <div class="col-md-2">
      <button @click="resetFilter" class="btn btn-danger">Reset</button>
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
            <button @click="navigateTo(film.id)" type="button" class="btn btn-info">Info</button>

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
          :class="{'disabled' : filmStore.currentPage === 1}"
          class="page-item">
        <a
            @click.prevent = "goto(filmStore.currentPage + 1)"
            class="page-link"
            href="#">Next</a></li>
    </ul>
  </nav>
</template>

<style scoped>

.select-box {
  font-size: 1rem;
}


.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
}


.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}


.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  flex-grow: 1;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #343a40;
}

.card-text {
  font-size: 0.9rem;
  color: #6c757d;
}

.card-body .btn {
  align-self: flex-start;
}


.pagination {
  display: flex;
  justify-content: center;
}

.page-item {
  cursor: pointer;
}

.page-item.active .page-link {
  background-color: #007bff;
  color: white;
}

.page-item.disabled .page-link {
  cursor: not-allowed;
  color: #6c757d;
}

.btn-outline-warning {
  width: 100%;
  font-weight: bold;
}

@media (max-width: 767px) {
  .row-cols-md-3 .col {
    margin-bottom: 15px;
  }
}
</style>



