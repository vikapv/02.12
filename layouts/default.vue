<template>


  <header>
    <!-- Fixed navbar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">KinoTower</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">

              <NuxtLink class="nav-link active" to="/">Home</NuxtLink>
            </li>
          </ul>
          <div class="ms-auto d-flex">
            <template>
            <NuxtLink to="/signin"><button class="btn btn-dark" type="button" >Sign In</button></NuxtLink>
            <NuxtLink to="/signup"><button class="btn btn-dark" type="button" >Sign Up</button></NuxtLink>
            </template>
          </div>

        </div>
      </div>
    </nav>
  </header>

  <!-- Begin page content -->
  <main class="flex-shrink-0">
    <div class="container">
      <slot />
    </div>
  </main>

  <!--  <footer class="fixed-bottom">-->
  <!--    <div class="container">-->
  <!--      <span class="text-body-secondary">KinoTower-2024.</span>-->
  <!--    </div>-->
  <!--  </footer>-->


</template>
<script setup lang="ts">

</script>