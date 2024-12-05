<template>
  <div class="layout">
    <header class="fixed-header">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">KinoTower</a>
          <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/">Home</NuxtLink>
              </li>
            </ul>
            <div class="ms-auto d-flex align-items-center">
              <!-- Если пользователь аутентифицирован -->
              <template v-if="isAuthenticated">
                <button
                    class="btn btn-sm btn-outline-secondary mx-2"
                >
                  User
                </button>
                <button
                    class="btn btn-sm btn-outline-secondary mx-2"
                    type="button"
                    @click="signOut"
                >
                  Exit
                </button>
              </template>
              <!-- Если пользователь не аутентифицирован -->
              <template v-else>
                <NuxtLink to="/signin">
                  <button class="btn btn-sm btn-outline-secondary mx-2" type="button">Sign In</button>
                </NuxtLink>
                <NuxtLink to="/signup">
                  <button class="btn btn-sm btn-outline-secondary" type="button">Sign Up</button>
                </NuxtLink>
              </template>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <NuxtPage />
    </main>

    <footer class="footer">
      <div class="container text-center">
        <p class="lead"> &copy; KinoTower-2024.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from '#vue-router';

const authStore = useAuthStore();
const router = useRouter();

// Вычисляемое свойство для проверки аутентификации
const isAuthenticated = computed(() => authStore.isAuthenticated);

// Функция выхода из системы
const signOut = () => {
  authStore.signout();
  router.push('/');
};
</script>