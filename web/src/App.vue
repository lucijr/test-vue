<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="#" class="navbar-brand">Luciano Júnior | Mecpock</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/customers" class="nav-link">Clientes</a>
        </li>
        <li class="nav-item">
          <a href="/add" class="nav-link">Novo Cliente</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>
