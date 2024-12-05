<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { api } from "~/api";
import { useAuthStore } from "~/stores/auth";
import {useFilmStore} from "~/stores/film.js";

const filmStore = useFilmStore();
const userStore = useAuthStore();
const route = useRoute();
const film = ref(null);
const reviews = ref([]);
const filmId = filmStore.film.id;

const fetchFilmReviews = async () => {
  try {
    const res = await api.get(`/films/${filmId}/reviews`);
    reviews.value = res.data.reviews || [];
  } catch (error) {
    console.error("Ошибка загрузки отзывов:", error);
  }
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("ru-RU", options);
};

  fetchFilmReviews();

</script>

<template>
  <div v-if="film" class="container">
    <h2 class="text-center mt-3 mb-3">Movie watch page</h2>


    <div class="video-section">
      <div class="ratio ratio-16x9">
        <iframe :src="film.link_video" title="Video player" allowfullscreen></iframe>
      </div>
    </div>


    <div class="film-description">
      <div class="film-image-container">
        <img v-if="film.link_img" :src="film.link_img" class="film-image" alt="Film Image">
        <img v-else :src="'https://poster4.me/wp-content/uploads/2020/01/img_1551.jpeg'" class="film-image" alt="Film Image">
      </div>
      <div class="film-info">
        <h2>{{ film.name }}</h2>
        <p class="text-muted">
          Duration: {{ film.duration }} min | Country: {{ film.country.name }} | Year: {{ film.year_of_issue }} | Age: {{ film.age }}
        </p>
        <p class="text-muted">
          Genres: <template v-for="category in film.categories" :key="category.id">{{category.name}} </template>
        </p>
        <div class="stars mt-3">
          <span v-for="n in 5" :key="n" class="star">
            <i class="bi" :class="n <= Math.round(film.ratingAvg) ? 'bi-star-fill' : 'bi-star'"></i>
          </span>
        </div>
        <div class="text-center mt-3">
          <a :href="film.link_kinopoisk" class="btn btn-warning" target="_blank" rel="noopener noreferrer">Link Kinopoisk</a>
        </div>
      </div>
    </div>

    <!-- Добавить отзыв -->
    <div class="col-12 mt-4">
      <h5>Add review</h5>
      <textarea class="form-control mb-3" placeholder="Your message"></textarea>
      <button class="btn btn-primary">Submit</button>
    </div>

    <!-- Отзывы -->
    <div class="col-12 mt-4">
      <h5>Reviews</h5>
      <div v-for="(review, index) in film.reviews" :key="index" class="mb-3">
        <p><strong>{{ review.author }}</strong> <span class="text-muted">{{ review}}</span></p>
        <p>{{ review.message }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Film not found.</p>
  </div>
</template>

<style scoped>

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.video-section {
  margin-bottom: 30px;
}

.film-description {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.film-image-container {
  flex: 0 0 300px;
  max-width: 300px;
  margin-right: 30px;
}

.film-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.film-info {
  flex-grow: 1;
}

.film-info h2 {
  font-size: 2rem;
}

.stars {
  font-size: 1.5rem;
}

.star {
  color: grey;
  margin: 0 2px;
}

.star:hover {
  cursor: pointer;
  color: gold;
}

textarea {
  resize: none;
}

@media (max-width: 768px) {
  .film-description {
    flex-direction: column;
    align-items: center;
  }

  .film-image-container {
    margin-bottom: 20px;
  }

  .film-info {
    text-align: center;
  }
}
</style>
