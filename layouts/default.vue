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
                <NuxtLink to="/profile">
                  <button class="btn btn-sm btn-outline-secondary" type="button">Profile</button>
                </NuxtLink>
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

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #343a40;
  z-index: 1000;
}

.navbar {
  padding: 0.8rem 2rem;
}

.navbar-brand {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.navbar-toggler {
  border: none;
}

.navbar-toggler-icon {
  background-color: #ffffff;
}

.navbar-nav .nav-link {
  color: #ffffff;
  margin-right: 1.5rem;
  font-size: 1.1rem;
}

.navbar-nav .nav-link:hover {
  color: #ff0000;
}

.btn-outline-secondary {
  border-color: #6c757d;
  color: #6c757d;
}

.btn-outline-secondary:hover {
  background-color: #6c757d;
  color: #ffffff;
}

.main-content {
  flex: 1;
  padding: 80px 2rem 2rem;
  background-color: #ffffff;
}

.footer {
  background-color: #343a40;
  color: #ffffff;
  padding: 1.5rem 0;
}

.footer .lead {
  margin-bottom: 0;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .navbar-toggler {
    margin-left: auto;
  }

  .navbar-nav {
    margin-top: 1rem;
  }
}
</style>